/**
 * Returns the [year, month, day, hour, minute, seconds] tokens of the provided
 * `date` as it will be rendered in the `timeZone`.
 */
export default function tzTokenizeDate(date, timeZone) {
  const dtf = getDateTimeFormat(timeZone)
  return dtf.formatToParts ? partsOffset(dtf, date) : hackyOffset(dtf, date)
}

const typeToPos = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
}

function partsOffset(dtf, date) {
  const formatted = dtf.formatToParts(date)
  const filled = []
  for (let i = 0; i < formatted.length; i++) {
    const { type, value } = formatted[i]
    const pos = typeToPos[type]

    if (pos >= 0) {
      filled[pos] = parseInt(value, 10)
    }
  }
  return filled
}

function hackyOffset(dtf, date) {
  const formatted = dtf.format(date).replace(/\u200E/g, '')
  const parsed = /(\d+)\/(\d+)\/(\d+),? (\d+):(\d+):(\d+)/.exec(formatted)
  const [, fMonth, fDay, fYear, fHour, fMinute, fSecond] = parsed
  return [fYear, fMonth, fDay, fHour, fMinute, fSecond]
}

// Get a cached Intl.DateTimeFormat instance for the IANA `timeZone`. This can be used
// to get deterministic local date/time output according to the `en-US` locale which
// can be used to extract local time parts as necessary.
const dtfCache = {}
function getDateTimeFormat(timeZone) {
  if (!dtfCache[timeZone]) {
    dtfCache[timeZone] = new Intl.DateTimeFormat('en-US', {
      hour12: false,
      timeZone: timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }
  return dtfCache[timeZone]
}
