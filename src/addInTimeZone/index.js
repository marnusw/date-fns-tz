import dateFnsAdd from 'date-fns/add/index.js'
import toDate from '../toDate/index.js'
import formatInTimeZone from '../formatInTimeZone/index.js'

/**
 * @name addInTimeZone
 * @category Common Helpers
 * @summary Add the specified years, months, weeks, days, hours, minutes and seconds to the given date, in the given time zone.
 *
 * @description
 * Add the specified years, months, weeks, days, hours, minutes and seconds to the given date, in the given time zone.
 * The time zone can make a difference because of Daylight Savings Time.
 * At 11pm Nov 4 2022 in LA, +1 day (= 11pm Nov 5) means +24 hrs.
 * But at the same time in Halifax (3am Nov 5) +1 day (= 3am Nov 6) means +25 hrs,
 * because the clocks fall back 1 hr at 2am.
 *
 * @param date - the date to be changed
 * @param timeZone - the time zone to do the calculation in; can be an offset or IANA time zone
 * @param duration - the object with years, months, weeks, days, hours, minutes and seconds to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 *
 * | Key            | Description                        |
 * |----------------|------------------------------------|
 * | years          | Amount of years to be added        |
 * | months         | Amount of months to be added       |
 * | weeks          | Amount of weeks to be added        |
 * | days           | Amount of days to be added         |
 * | hours          | Amount of hours to be added        |
 * | minutes        | Amount of minutes to be added      |
 * | seconds        | Amount of seconds to be added      |
 *
 * All values default to 0
 *
 * @returns the new date with the duration added
 *
 * @example
 * // 11pm Nov 4 in LA === 3am Nov 5 in Halifax (UTC 2022-11-05T06:00Z).
 * // In LA, +1 day === 11pm Nov 5 === +24 hours,
 * // but in Halifax +1 day === 3am Nov 6 === +25 hours,
 * // because the clocks fall back 1 hour (in both places) at 2am Nov 6.
 * const HOUR = 60 * 60 * 1000;
 * const start = new Date('2022-11-05T06:00Z');
 * const resultLA = addInTimeZone(start, 'America/Los_Angeles', { days: 1 });
 * const resultHalifax = addInTimeZone(start, 'America/Halifax', { days: 1 });
 * console.log((resultLA.getTime() - start.getTime()) / HOUR); // => 24
 * console.log((resultHalifax.getTime() - start.getTime()) / HOUR); // => 25
 */
export default function addInTimeZone(dirtyDate, timeZone, duration) {
  const { years, months, weeks, days, hours, minutes, seconds } = duration

  // separate date and time portions
  const start = toDate(dirtyDate, { timeZone })
  const ymd = formatInTimeZone(start, timeZone, 'yyyy-MM-dd')
  const hms = formatInTimeZone(start, timeZone, 'HH:mm:ss.SSS')

  // add days and larger units to the date portion to get the target day
  const targetDay = dateFnsAdd(new Date(ymd), { years, months, weeks, days })
  const newYmd = targetDay.toISOString().slice(0, 10)

  // combine the new date portion with the original time portion
  const targetDayWithStartTime = toDate(newYmd + ' ' + hms, { timeZone })

  // now add hours and smaller units
  return dateFnsAdd(targetDayWithStartTime, { hours, minutes, seconds })
}
