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

export * from './format/index'
export * from './formatInTimeZone/index'
export * from './fromZonedTime/index'
export * from './toZonedTime/index'
export * from './getTimezoneOffset/index'
export * from './toDate/index'
