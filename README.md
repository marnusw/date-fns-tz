# date-fns-tz

Time zone support for [date-fns](https://date-fns.org/) v2.0.0 using the
[Intl API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl). By using
the browser API no time zone data needs to be included in code bundles. Modern browsers all support the
[necessary features](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat#Browser_compatibility),
and for those that don't a [polyfill](https://github.com/yahoo/date-time-format-timezone) can be used.

If you do not wish to use a polyfill the time zone option can still be used, but only with
time zone offsets such as '-0200' or '+04:00' and not IANA time zone names.

## Table of Contents

- [Overview](#overview)
- [Time Zone Helpers](#time-zone-helpers)
    - [`zonedTimeToUtc`](#zonedtimetoutc) - Given a date and any time zone, returns a `Date` with the equivalent UTC time
    - [`utcToZonedTime`](#utctozonedtime) - Get a date/time representing local time in a given time zone from the UTC date
- [Time Zone Formatting](#time-zone-formatting)
    - [`format`](#format) - Extends `date-fns/format` with full time zone support
    - [`toDate`](#todate) - Can be used to create a zoned Date from a string containing an offset or IANA time zone
- [Usage with Node.js](#usage-with-nodejs)

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
up events which will start at a specific time in the venue's local time, and this local time should be
shown when accessing the site from anywhere in the world.

### `zonedTimeToUtc`

**Given a date and any time zone, returns a `Date` with the equivalent UTC time**

```js
zonedTimeToUtc(date: Date|Number|String, timeZone: String): Date
```

Say a user is asked to input the date/time and time zone of an event. A date/time picker will typically
return a Date instance with the chosen date, in the user's local time zone, and a select input might
provide the actual IANA time zone name.

In order to work with this info effectively it is necessary to find the equivalent UTC time:

```javascript
import { zonedTimeToUtc } from 'date-fns-tz'

const date = getDatePickerValue()     // e.g. 2014-06-25 10:00:00 (picked in any time zone)
const timeZone = getTimeZoneValue()   // e.g. America/Los_Angeles

const utcDate = zonedTimeToUtc(date, timeZone)  // In June 10am in Los Angeles is 5pm UTC

postToServer(utcDate.toISOString(), timeZone) // post 2014-06-25T17:00:00.000Z, America/Los_Angeles
```

### `utcToZonedTime`

**Get a date/time in the local time of any time zone from UTC time**

```js
utcToZonedTime(date: Date|Number|String, timeZone: String): Date
```

Say the server provided a UTC date/time and a time zone which should be used as initial values for the above form.
The date/time picker will take a Date input which will be in the user's local time zone, but the date value
must be that of the target time zone.

```javascript
import { utcToZonedTime } from 'date-fns-tz'

const { isoDate, timeZone } = fetchInitialValues()  // 2014-06-25T10:00:00.000Z, America/New_York

const date = utcToZonedTime(isoDate, timeZone)    // In June 10am UTC is 6am in New York (-04:00)

renderDatePicker(date)          // 2014-06-25 06:00:00 (in the system time zone)
renderTimeZoneSelect(timeZone)  // America/New_York
```

## Time Zone Formatting

### `format`

The `format` function exported from this library extends `date-fns/format` with full time zone support for:

- The `z..zzz` Unicode tokens: *short specific non-location format*
- The `zzzz` Unicode token: *long specific non-location format*

When using those tokens with `date-fns/format` it falls back to GMT timezones, and always uses the local
system timezone. For example `zzz` in New York would return `GMT-4` instead of the desired `EST`, whereas
this extended `format` function will return the latter.

To format a date to a string showing time for a specific time zone, which can be different from the system
time zone, the `format` function can be combined with `utcToZonedTime` as shown in the example below. *To
clarify, the `format` function will never change the underlying date, it must be changed to a zoned time
before passing it to `format`.*

Since a zoned time `Date` instance cannot convey the time zone information to the `format` function it is
necessary to pass the same `timeZone` value as an option on the third argument of `format`. When using this
option the `z..zzzz`, `x..xxxxx`, `X..XXXXX` and `O..OOO` tokens will all print the provided time zone rather
than the system time zone.

```javascript
import { format, utcToZonedTime } from 'date-fns-tz'

const date = new Date('2014-10-25T10:46:20Z')
const nyTimeZone = 'America/New_York'
const parisTimeZone = 'Europe/Paris'

const nyDate = utcToZonedTime(date, nyTimeZone)
const parisDate = utcToZonedTime(date, parisTimeZone)

format(nyDate, 'yyyy-MM-dd HH:mm:ssXXX', { timeZone: 'America/New_York' })  // 2014-10-25 06:46:20-04:00
format(nyDate, 'yyyy-MM-dd HH:mm:ss zzz', { timeZone: 'America/New_York' }) // 2014-10-25 06:46:20 EST
format(parisDate, 'yyyy-MM-dd HH:mm:ss zzz', { timeZone: 'Europe/Paris' })  // 2014-10-25 10:46:20 GMT+2

// The time zone name is generated by the Intl API which works best when a locale is also provided
import enGB from 'date-fns/locale/en-GB'

format(parisDate, 'yyyy-MM-dd HH:mm:ss zzz', { timeZone: 'Europe/Paris', locale: enGB })
// 2014-10-25 10:46:20 CEST
format(parisDate, 'yyyy-MM-dd HH:mm:ss zzzz', { timeZone: 'Europe/Paris', locale: enGB })
// 2014-10-25 10:46:20 Central European Summer Time
```

### `toDate`

The `toDate` function can be used to create a zoned Date from a string containing an offset or IANA
time zone, or by providing the `timeZone` option.

```javascript
import { toDate, format } from 'date-fns-tz'

// Offsets in the date string work as usual and take precedence
const parisDate = toDate('2014-10-25T13:46:20+02:00')
format(parisDate, 'yyyy-MM-dd HH:mm:ssZ', { timeZone: 'Europe/Paris' }) // 2014-10-25 13:46:20+02:00

// Since toDate simply clones a Date instance timeZone option is effectively ignored in this case
const date = new Date('2014-10-25T13:46:20Z')
const clonedDate = toDate(date, { timeZone: 'Europe/Paris' })
assert(date.valueOf() === clonedDate.valueOf())

// When there is no offset in the date string the timeZone property is used
const bangkokDate = toDate('2014-10-25T13:46:20', { timeZone: 'Asia/Bangkok' })
format(bangkokDate, 'yyyy-MM-dd HH:mm:ssZ', { timeZone: 'Asia/Bangkok' }) // 2014-10-25 13:46:20+07:00

const nyDate = toDate('2014-10-25T13:46:20 America/New_York')
format(nyDate, 'yyyy-MM-dd HH:mm:ssZ', { timeZone: 'America/New_York' }) // 2014-10-25 13:46:20-04:00
```

**Note:** Since the Intl API does not provide a way to parse long or short time zone names the `parse`
function cannot be supported using this approach.

## Usage with Node.js

Node.js supports the `Intl` API. From v13 Node.js ships with full ICU data included in the binary, however
the current LTS version 12.14 is still built with the `small-icu` flag and only contains ICU data for the
`en-US` locale. To use this library with Node.js 12 and any locale other than `en-US` it should be run
with
[ICU data provided at runtime](https://nodejs.org/docs/latest-v12.x/api/intl.html#intl_providing_icu_data_at_runtime).

## Credit

The idea of using the Intl API for time zone support was inspired by the [Luxon](https://github.com/moment/luxon)
library.

The initial port of the idea into date-fns was done by [@benmccan](https://github.com/benmccann) in
[date-fns/#676](https://github.com/date-fns/date-fns/pull/676).

## License

MIT © Marnus Weststrate
