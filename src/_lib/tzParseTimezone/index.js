import tzTokenizeDate from '../tzTokenizeDate/index.js'

var MILLISECONDS_IN_HOUR = 3600000
var MILLISECONDS_IN_MINUTE = 60000

var patterns = {
  timezone: /([Z+-].*)$/,
  timezoneZ: /^(Z)$/,
  timezoneHH: /^([+-])(\d{2})$/,
  timezoneHHMM: /^([+-])(\d{2}):?(\d{2})$/,
  timezoneIANA: /(UTC|(?:[a-zA-Z]+\/[a-zA-Z_-]+(?:\/[a-zA-Z_]+)?))$/,
}

// Parse various time zone offset formats to an offset in milliseconds
export default function tzParseTimezone(timezoneString, date, isUtcDate) {
  var token
  var absoluteOffset

  // Z
  token = patterns.timezoneZ.exec(timezoneString)
  if (token) {
    return 0
  }

  var hours

  // ±hh
  token = patterns.timezoneHH.exec(timezoneString)
  if (token) {
    hours = parseInt(token[2], 10)

    if (!validateTimezone(hours)) {
      return NaN
    }

    absoluteOffset = hours * MILLISECONDS_IN_HOUR
    return token[1] === '+' ? -absoluteOffset : absoluteOffset
  }

  // ±hh:mm or ±hhmm
  token = patterns.timezoneHHMM.exec(timezoneString)
  if (token) {
    hours = parseInt(token[2], 10)
    var minutes = parseInt(token[3], 10)

    if (!validateTimezone(hours, minutes)) {
      return NaN
    }

    absoluteOffset = hours * MILLISECONDS_IN_HOUR + minutes * MILLISECONDS_IN_MINUTE
    return token[1] === '+' ? -absoluteOffset : absoluteOffset
  }

  // IANA time zone
  token = patterns.timezoneIANA.exec(timezoneString)
  if (token || isValidTimezoneString(timezoneString)) {
    date = new Date(date || Date.now())
    var utcDate = isUtcDate ? date : toUtcDate(date)

    var offset = calcOffset(utcDate, timezoneString)

    var fixedOffset = isUtcDate ? offset : fixOffset(date, offset, timezoneString)

    return -fixedOffset
  }

  return 0
}

function toUtcDate(date) {
  return new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds()
    )
  )
}

function calcOffset(date, timezoneString) {
  var tokens = tzTokenizeDate(date, timezoneString)

  var asUTC = Date.UTC(tokens[0], tokens[1] - 1, tokens[2], tokens[3] % 24, tokens[4], tokens[5])

  var asTS = date.getTime()
  var over = asTS % 1000
  asTS -= over >= 0 ? over : 1000 + over
  return asUTC - asTS
}

function fixOffset(date, offset, timezoneString) {
  var localTS = date.getTime()

  // Our UTC time is just a guess because our offset is just a guess
  var utcGuess = localTS - offset

  // Test whether the zone matches the offset for this ts
  var o2 = calcOffset(new Date(utcGuess), timezoneString)

  // If so, offset didn't change and we're done
  if (offset === o2) {
    return offset
  }

  // If not, change the ts by the difference in the offset
  utcGuess -= o2 - offset

  // If that gives us the local time we want, we're done
  var o3 = calcOffset(new Date(utcGuess), timezoneString)
  if (o2 === o3) {
    return o2
  }

  // If it's different, we're in a hole time. The offset has changed, but the we don't adjust the time
  return Math.max(o2, o3)
}

function validateTimezone(hours, minutes) {
  if (minutes != null && (minutes < 0 || minutes > 59)) {
    return false
  }

  return true
}

function isValidTimezoneString(timeZoneString) {
  try {
      Intl.DateTimeFormat(undefined, {timeZone: timeZoneString});
      return true;
  }
  catch {
      return false;
  }
}
