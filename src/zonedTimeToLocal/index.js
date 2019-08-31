import toDate from '../toDate'
import zonedTimeToUtc from '../zonedTimeToUtc'
import utcToZonedTime from '../utcToZonedTime'

/**
 * @name zonedTimeToLocal
 * @category Time Zone Helpers
 * @summary Get the local time from a date representing in a given time zone
 *
 * @description
 * Returns a date instance from the local time of the provided time with specific timezone
 *
 * @param {Date|String|Number} dirtyDate - the date with values representing the local time
 * @param {String} timeZone - the time zone of this local time, can be an offset or IANA time zone
 * @returns {Date} the new date with the equivalent time in the time zone
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // if your local time zone is Singapore, In August 5am in Los Angeles is 8pm in singapore
 * const result = zonedTimeToLocal(new Date(2019, 8, 29, 5, 0, 0), 'America/Los_Angeles')
 */

export default function zonedTimeToLocal(dirtyDate, timeZone) {
  var date = toDate(dirtyDate)

  // get local timezone
  var localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  // Convert giving date with specific timezone to utc timezone
  var utcDate = zonedTimeToUtc(date, timeZone)

  // return locale time
  return utcToZonedTime(utcDate, localTimezone)
}
