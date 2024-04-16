import { tzIntlTimeZoneName } from '../../_lib/tzIntlTimeZoneName/index.js'
import { tzParseTimezone } from '../../_lib/tzParseTimezone/index.js'
import type { FormatOptionsWithTZ } from '../../index.js'

const MILLISECONDS_IN_MINUTE = 60 * 1000

export const formatters: Record<
  string,
  (date: Date, token: string, options: FormatOptionsWithTZ) => string | undefined
> = {
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function (date, token, options) {
    const timezoneOffset = getTimeZoneOffset(options.timeZone, date)

    if (timezoneOffset === 0) {
      return 'Z'
    }

    switch (token) {
      // Hours and optional minutes
      case 'X':
        return formatTimezoneWithOptionalMinutes(timezoneOffset)

      // Hours, minutes and optional seconds without `:` delimeter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case 'XXXX':
      case 'XX': // Hours and minutes without `:` delimeter
        return formatTimezone(timezoneOffset)

      // Hours, minutes and optional seconds with `:` delimeter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case 'XXXXX':
      case 'XXX': // Hours and minutes with `:` delimeter
      default:
        return formatTimezone(timezoneOffset, ':')
    }
  },

  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function (date, token, options) {
    const timezoneOffset = getTimeZoneOffset(options.timeZone, date)

    switch (token) {
      // Hours and optional minutes
      case 'x':
        return formatTimezoneWithOptionalMinutes(timezoneOffset)

      // Hours, minutes and optional seconds without `:` delimeter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case 'xxxx':
      case 'xx': // Hours and minutes without `:` delimeter
        return formatTimezone(timezoneOffset)

      // Hours, minutes and optional seconds with `:` delimeter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case 'xxxxx':
      case 'xxx': // Hours and minutes with `:` delimeter
      default:
        return formatTimezone(timezoneOffset, ':')
    }
  },

  // Timezone (GMT)
  O: function (date, token, options) {
    const timezoneOffset = getTimeZoneOffset(options.timeZone, date)

    switch (token) {
      // Short
      case 'O':
      case 'OO':
      case 'OOO':
        return 'GMT' + formatTimezoneShort(timezoneOffset, ':')
      // Long
      case 'OOOO':
      default:
        return 'GMT' + formatTimezone(timezoneOffset, ':')
    }
  },

  // Timezone (specific non-location)
  z: function (date, token, options) {
    switch (token) {
      // Short
      case 'z':
      case 'zz':
      case 'zzz':
        return tzIntlTimeZoneName('short', date, options)
      // Long
      case 'zzzz':
      default:
        return tzIntlTimeZoneName('long', date, options)
    }
  },
}

function getTimeZoneOffset(timeZone: string | undefined, originalDate: Date|undefined = undefined) {
  const timeZoneOffset = timeZone
    ? tzParseTimezone(timeZone, originalDate, true) / MILLISECONDS_IN_MINUTE
    : (originalDate?.getTimezoneOffset() ?? 0)
  if (Number.isNaN(timeZoneOffset)) {
    throw new RangeError('Invalid time zone specified: ' + timeZone)
  }
  return timeZoneOffset
}

function addLeadingZeros(number: number, targetLength: number) {
  const sign = number < 0 ? '-' : ''
  let output = Math.abs(number).toString()
  while (output.length < targetLength) {
    output = '0' + output
  }
  return sign + output
}

function formatTimezone(offset: number, delimiter = '') {
  const sign = offset > 0 ? '-' : '+'
  const absOffset = Math.abs(offset)
  const hours = addLeadingZeros(Math.floor(absOffset / 60), 2)
  const minutes = addLeadingZeros(Math.floor(absOffset % 60), 2)
  return sign + hours + delimiter + minutes
}

function formatTimezoneWithOptionalMinutes(offset: number, delimiter?: string) {
  if (offset % 60 === 0) {
    const sign = offset > 0 ? '-' : '+'
    return sign + addLeadingZeros(Math.abs(offset) / 60, 2)
  }
  return formatTimezone(offset, delimiter)
}

function formatTimezoneShort(offset: number, delimiter = '') {
  const sign = offset > 0 ? '-' : '+'
  const absOffset = Math.abs(offset)
  const hours = Math.floor(absOffset / 60)
  const minutes = absOffset % 60
  if (minutes === 0) {
    return sign + String(hours)
  }
  return sign + String(hours) + delimiter + addLeadingZeros(minutes, 2)
}
