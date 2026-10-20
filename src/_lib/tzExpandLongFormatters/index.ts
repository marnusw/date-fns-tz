import { getDefaultOptions } from 'date-fns/getDefaultOptions'
import { enUS } from 'date-fns/locale/en-US'
import type { Locale } from 'date-fns'

type FormatLong = Locale['formatLong']
type Width = 'short' | 'medium' | 'long' | 'full'

const longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g

const widths: Width[] = ['short', 'medium', 'long', 'full']

/**
 * Expands the long localized formatting tokens (`P` and `p`) of the format string into
 * the patterns of the locale, the same way `date-fns` does. This is needed because the
 * time zone tokens contained in the expanded patterns (e.g. `ppp` => `h:mm:ss a z`) have
 * to be handled by this library rather than by `date-fns`, which would use the system
 * time zone.
 */
export function tzExpandLongFormatters(
  formatStr: string,
  locale: Pick<Locale, 'formatLong'> | undefined
): string {
  const formatLong = (locale ?? getDefaultOptions().locale ?? enUS).formatLong
  if (!formatLong) {
    return formatStr
  }

  return formatStr.replace(longFormattingTokensRegExp, (substring) => {
    if (substring[0] !== 'P' && substring[0] !== 'p') {
      return substring
    }
    return expandToken(substring, formatLong)
  })
}

function pickWidth(token: string): Width {
  return widths[Math.min(token.length, 4) - 1]
}

// The `z` token of the long time patterns is a GMT offset (e.g. `GMT+2`) in `date-fns`,
// which is what `O` formats here, so it is swapped to have it use the time zone option.
function longTime(token: string, formatLong: FormatLong): string {
  return formatLong
    .time({ width: pickWidth(token) })
    .replace(/'(''|[^'])+('|$)|z+/g, (substring) =>
      substring[0] === 'z' ? (substring.length === 4 ? 'OOOO' : 'O') : substring
    )
}

function expandToken(token: string, formatLong: FormatLong): string {
  const [, datePattern, timePattern] = token.match(/(P+)(p+)?/) || []

  if (!datePattern) {
    return longTime(token, formatLong)
  }
  if (!timePattern) {
    return formatLong.date({ width: pickWidth(datePattern) })
  }

  return formatLong
    .dateTime({ width: pickWidth(datePattern) })
    .replace('{{date}}', formatLong.date({ width: pickWidth(datePattern) }))
    .replace('{{time}}', longTime(timePattern, formatLong))
}
