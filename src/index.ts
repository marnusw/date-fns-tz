import type { Day, FirstWeekContainsDate, Locale, LocaleUnit, RoundingMethod } from 'date-fns'

export interface OptionsWithTZ {
  weekStartsOn?: Day
  firstWeekContainsDate?: FirstWeekContainsDate
  additionalDigits?: 0 | 1 | 2
  timeZone?: string
  originalDate?: Date | string | number
  locale?: Locale
  includeSeconds?: boolean
  addSuffix?: boolean
  unit?: LocaleUnit
  roundingMethod?: RoundingMethod
  awareOfUnicodeTokens?: boolean
}

export { format } from './format/index.js'
export { formatInTimeZone } from './formatInTimeZone/index.js'
export { fromZonedTime } from './fromZonedTime/index.js'
export { toZonedTime } from './toZonedTime/index.js'
export { getTimezoneOffset } from './getTimezoneOffset/index.js'
export { toDate } from './toDate/index.js'
