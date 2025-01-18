import utcToZonedTime from '../utcToZonedTime/index.js'
import zonedTimeToUtc from '../zonedTimeToUtc/index.js'
import format from '../zonedTimeToUtc/index.js'

/**
 * @name convertTimezone
 * @category Time Zone Helpers
 * @summary Get the time and it's timezone as input and convert it to desired timezone. In other word it will convert an time to 
 * the desired timezone. It uses utcToZonedTime and zonedTimeToUtc function to get the desired time. In addition an optional parameter
 * used to format the time in specific pattern.
 *
 * @description
 * Returns the converted time in desired timezone with specified format in string, by default it considers input timezone as UTC
 * @param {String|Date} inputTime
 * @param {String} currentTimezone = 'UTC'
 * @param {String} convertTimezone = ''
 * @param {String} formatPattern = 'yyyy-MM-dd HH:mm:ss'
 * @returns {string} the formatted date string
 */



export default function convertTimezone (
  inputTime,
  currentTimezone = 'UTC',
  convertTimezone = '',
  formatPattern = 'yyyy-MM-dd HH:mm:ss',
) {
  try {
      if (convertTimezone === '') {
          convertTimezone = currentTimezone;
      }
      let currentTimeInGivenTimezone;

      if (currentTimezone === 'UTC') {
          currentTimeInGivenTimezone = utcToZonedTime(inputTime, convertTimezone);
      } else {
          const currentTimezoneToUtc = zonedTimeToUtc(inputTime, currentTimezone);
          if (convertTimezone === 'UTC') {
              currentTimeInGivenTimezone = currentTimezoneToUtc;
          } else {
              currentTimeInGivenTimezone = utcToZonedTime(currentTimezoneToUtc, convertTimezone);
          }
      }
      return format(currentTimeInGivenTimezone, formatPattern, { timeZone: convertTimezone });
  } catch (e) {
      return format(new Date(), formatPattern);
  }
};