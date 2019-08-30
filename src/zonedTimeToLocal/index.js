import toDate from '../toDate'
import zonedTimeToUtc from '../zonedTimeToUtc'

/**
 * @name zonedTimeToLocal
 * @category Time Zone Helpers
 * @summary Get the local time from a date representing in a given time zone
 *
 * @description
 * Returns a date instance with the local time of the provided time with specific timezone
 *
 * @param {Date|String|Number} date - the date with values representing the local time
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

  // Convert giving date with specific timezone to utc timezone
  var utcDate = zonedTimeToUtc(date, timeZone)
  // get offset between giving timezone with local timezone
  var offset = utcDate.getTimezoneOffset()

  return toDate(date.getTime() - offset * 60 * 1000)
}
