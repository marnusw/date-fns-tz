# date-fns-tz

Time zone support for [date-fns](https://date-fns.org/) v2.0.0.

Dependency free IANA time zone support is implemented via the
[Intl API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) to keep 
actual time zone data out of code bundles. Modern browsers all support the 
[necessary features](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat#Browser_compatibility),
and for those that don't a [polyfill](https://github.com/yahoo/date-time-format-timezone) can be used.

If you do not wish to use a polyfill the time zone option can still be used, but only with
time zone offsets such as '-0200' or '+04:00' and not IANA time zone names.

*This work was initially proposed in PR [date-fns/#707](https://github.com/date-fns/date-fns/pull/707), but won't
be considered until `date-fns` version 2 has been released. It is my hope that these features will eventually 
make it into `date-fns` or at least contribute to the conversation and that this project will be deprecated.* 

## Table of Contents

- [Overview](#overview)
- [Time Zone Helpers](#time-zone-helpers)
    - [`localTimeToUtc` - Get the UTC date/time from a date representing local time in a given time zone](#localtimetoutc)
    - [`utcToLocalTime` - Get a date/time representing local time in a given time zone from the UTC date](#utctolocaltime)
- [Time Zone Formatting](#time-zone-formatting)
    - [`format`](#format)
    - [`toDate`](#todate)


Caveat: Formatting to zzzz full tz name is not perfect, because if the language default is to use the short name for 'long' it will always be short
Caveat: Full time zone names cannot be parsed with this technique.


## Overview

Working with UTC or ISO date strings is easy, and so is working with JS dates when all times
are displayed in a user's local time in the browser. The difficulty comes when working with another 
time zone's local time, other than the current system's, like on a Node server or when showing the time 
of an event in a specific time zone, like an event in LA at 8pm PST regardless of where a user resides.

In this case there are two relevant pieces of information: 
 - a fixed moment in time in the form of a timestamp, UTC or ISO date string, and
 - the time zone descriptor, usually an offset or IANA time zone name (e.g. `America/New_York`).

Libraries like Moment and Luxon, which provide their own date time classes, manage these timestamp and time 
zone values internally. Sine `date-fns` always returns a plain JS Date, which implicitly has the current 
system's time zone, helper functions are provided for handling common time zone related use cases. 

## Time Zone Helpers

To discuss the usage of the time zone helpers let's assume we're writing a system where administrators set
up events which will be start at a specific time in the venue's local time, and this local time should be 
shown when accessing the site from anywhere in the world.

### `localTimeToUtc`

**Get a date with the correct UTC time for the date/time in a specific time zone**

```flow js
localTimeToUtc(date: Date|Number|String, timeZone: String) : Date
```

Say a user is asked to input the date/time and time zone of an event. A date/time picker will typically 
return a Date instance with the chosen date, in the user's local time zone, and a select input might 
provide the actual IANA time zone name. 

In order to work with this info effectively it is necessary to find the equivalent UTC time:

```javascript
import { localTimeToUtc } from 'date-fns-tz'

const date = getDatePickerValue()     // e.g. 2014-06-25 10:00:00 (picked in any time zone) 
const timeZone = getTimeZoneValue()   // e.g. America/Los_Angeles

const utcDate = localTimeToUtc(date, timeZone)  // In June 10am in Los Angeles is 5pm UTC

postToServer(utcDate.toISOString(), timeZone) // post 2014-06-25T17:00:00.000Z, America/Los_Angeles
```

### `utcToLocalTime`

**Get a date/time in the local time of any time zone from UTC time**

Say the server provided a UTC date/time and a time zone which should be used as initial values for the above form.
The date/time picker will take a Date input which will be in the user's local time zone, but the date value 
must be that of the target time zone.

```javascript
import { utcToLocalTime } from 'date-fns-tz'

const { isoDate, timeZone } = fetchInitialValues()  // 2014-06-25T10:00:00.000Z, America/New_York

const date = utcToLocalTime(isoDate, timeZone)    // In June 10am UTC is 6am in New York (-04:00)

renderDatePicker(date)          // 2014-06-25 06:00:00 (in the system time zone)
renderTimeZoneSelect(timeZone)  // America/New_York
```

## Time Zone Formatting

### `format`

The `format` function exported from this library extends `date-fns/format` with full time zone support:

- The `z..zzz` Unicode tokens: *short specific non-location format*
- The `zzzz` Unicode token: *long specific non-location format*
- Using the name of any IANA time zone or offset by specifying a `timeZone` option;
  when using this option the `x..xxxxx`, `X..XXXXX` and `O..OOO` tokens will also use the provided
  time zone rather than the system time zone.

```javascript
import { format, utcToLocalTime } from 'date-fns-tz'

const date = new Date('2014-10-25T10:46:20Z')
const nyTimeZone = 'America/New_York'
const parisTimeZone = 'Europe/Paris'

const nyDate = utcToLocalTime(date, nyTimeZone)
const parisDate = utcToLocalTime(date, parisTimeZone)

format(nyDate, 'YYYY-MM-DD HH:mm:ssXXX', { timeZone: 'America/New_York' })  // 2014-10-25 06:46:20-04:00
format(nyDate, 'YYYY-MM-DD HH:mm:ss zzz', { timeZone: 'America/New_York' }) // 2014-10-25 06:46:20 EST
format(parisDate, 'YYYY-MM-DD HH:mm:ss zzz', { timeZone: 'Europe/Paris' })  // 2014-10-25 10:46:20 GMT+2

// The time zone name is generated by the Intl API which works best when a locale is also provided
import enGB from 'date-fns/locale/en-GB'
enGB.code = 'en-GB'
format(parisDate, 'YYYY-MM-DD HH:mm:ss zzz', { timeZone: 'Europe/Paris', locale: enGB }) 
// 2014-10-25 10:46:20 CEST
format(parisDate, 'YYYY-MM-DD HH:mm:ss zzzz', { timeZone: 'Europe/Paris', locale: enGB }) 
// 2014-10-25 10:46:20 Central European Summer Time
```

**Caveat:** Note that when using a locale the language code of the locale should be added to the import
somewhere in the project so `format` can identify the locale. Once this library is absorbed into `date-fns`
this can be added to each locale natively.

### `toDate`

A zoned Date can be created using the `toDate` function by providing the `timeZone` option or including 
an IANA time zone or offset in the date string.

```javascript
import { toDate, format } from 'date-fns-tz'

// Offsets in the date string work as usual and take precedence
const parisDate = toDate('2014-10-25T13:46:20+02:00')
format(parisDate, 'YYYY-MM-DD HH:mm:ssZ', { timeZone: 'Europe/Paris' }) // 2014-10-25 13:46:20+02:00

// Since toDate simply clones a Date instance timeZone option is effectively ignored in this case
const date = new Date('2014-10-25T13:46:20Z')
const clonedDate = toDate(date, { timeZone: 'Europe/Paris' })
assert(date.valueOf() === clonedDate.valueOf())

// When there is no offset in the date string the timeZone property is used
const bangkokDate = toDate('2014-10-25T13:46:20', { timeZone: 'Asia/Bangkok' })
format(bangkokDate, 'YYYY-MM-DD HH:mm:ssZ', { timeZone: 'Asia/Bangkok' }) // 2014-10-25 13:46:20+07:00

const nyDate = toDate('2014-10-25T13:46:20 America/New_York')
format(nyDate, 'YYYY-MM-DD HH:mm:ssZ', { timeZone: 'America/New_York' }) // 2014-10-25 13:46:20-04:00
```

**Note:** Since the Intl API does not provide a way to parse long or short time zone names the `parse`
function cannot be supported using this approach.

## Credit

The idea of using the Intl API for time zone support was inspired by the [Luxon](https://github.com/moment/luxon)
library. 

The initial port of the idea into date-fns was done by [@benmccan](https://github.com/benmccann) in 
[date-fns/#676](https://github.com/date-fns/date-fns/pull/676).

## Alternatives

The `[date-fns-timezone](https://github.com/prantlf/date-fns-timezone)` library provides similar functionality
for `date-fns` version 1 by bundling time zone data. This does have the advantage of making parsing time zone 
long and short names possible.

## License

MIT © Marnus Weststrate
