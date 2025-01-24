import { fromZonedTime } from '../fromZonedTime/index.js'
import { getTimezoneOffset } from '../getTimezoneOffset/index.js'

/**
 * @name getDaylightSavingTimeOffset
 * @category Time Zone Helpers
 * @summary Calculates the Daylight Saving Time (DST) offset in minutes for a specific date and timezone.
 *
 * @description
 * Returns the DST offset (in minutes) for a given date/timezone.
 * Scans offsets for all 12 months and picks the smallest as the standard.
 * Typically accurate for most modern DST rules globally.
 *
 * @param {Date} date - the date to calculate the DST offset for
 * @param {string} timezone - the timezone, either an IANA timezone or timezone offset
 */

export function getDaylightSavingTimeOffset(date: Date, timezone: string): number {
  // convert incoming date to zoned time based on given timezone
  const zonedDate = fromZonedTime(date, timezone)
  const thisYear = zonedDate.getFullYear()
  // get current timezone offset for the given date
  const currentOffset = getTimezoneOffset(timezone, zonedDate)
  /**
   * Iterate through each month to determine the standard (non-DST) timezone offset by selecting the min offset value
   * Assumes the standard offset is the smallest, typically representing the base offset w/o DST
   */
  let minOffset = Infinity
  for (let month = 0; month < 12; month++) {
    const offset = getTimezoneOffset(timezone, new Date(thisYear, month, 1))
    if (offset < minOffset) minOffset = offset
  }

  // calculate DST offset as the difference from standard
  return (currentOffset - minOffset) / (60 * 1000)
}
