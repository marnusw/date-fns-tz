import type { Locale } from 'date-fns'
import type { OptionsWithTZ } from '../../index'

/**
 * Returns the formatted time zone name of the provided `timeZone` or the current
 * system time zone if omitted, accounting for DST according to the UTC value of
 * the date.
 */
export function tzIntlTimeZoneName(
  length: Intl.DateTimeFormatOptions['timeZoneName'],
  date: Date,
  options: OptionsWithTZ
): string | undefined {
  const dtf = getDTF(length, options.timeZone, options.locale)
  return 'formatToParts' in dtf ? partsTimeZone(dtf, date) : hackyTimeZone(dtf, date)
}

function partsTimeZone(dtf: Intl.DateTimeFormat, date: Date): string | undefined {
  const formatted = dtf.formatToParts(date)

  for (let i = formatted.length - 1; i >= 0; --i) {
    if (formatted[i].type === 'timeZoneName') {
      return formatted[i].value
    }
  }
  return undefined
}

function hackyTimeZone(dtf: Intl.DateTimeFormat, date: Date) {
  const formatted = dtf.format(date).replace(/\u200E/g, '')
  const tzNameMatch = / [\w-+ ]+$/.exec(formatted)
  return tzNameMatch ? tzNameMatch[0].substr(1) : ''
}

// If a locale has been provided `en-US` is used as a fallback in case it is an
// invalid locale, otherwise the locale is left undefined to use the system locale.
function getDTF(
  length: Intl.DateTimeFormatOptions['timeZoneName'],
  timeZone: string | undefined,
  locale: Locale | undefined
) {
  if (locale && !locale.code) {
    throw new Error(
      "date-fns-tz error: Please set a language code on the locale object imported from date-fns, e.g. `locale.code = 'en-US'`"
    )
  }
  return new Intl.DateTimeFormat(locale ? [locale.code, 'en-US'] : undefined, {
    timeZone: timeZone,
    timeZoneName: length,
  })
}
