// This file is generated automatically by `scripts/build/typings.js`. Please, don't change it.

// FP Interfaces

interface CurriedFn1<A, R> {
  <A>(a: A): R
}

interface CurriedFn2<A, B, R> {
  <A>(a: A): CurriedFn1<B, R>
  <A, B>(a: A, b: B): R
}

interface CurriedFn3<A, B, C, R> {
  <A>(a: A): CurriedFn2<B, C, R>
  <A, B>(a: A, b: B): CurriedFn1<C, R>
  <A, B, C>(a: A, b: B, c: C): R
}

interface CurriedFn4<A, B, C, D, R> {
  <A>(a: A): CurriedFn3<B, C, D, R>
  <A, B>(a: A, b: B): CurriedFn2<C, D, R>
  <A, B, C>(a: A, b: B, c: C): CurriedFn1<D, R>
  <A, B, C, D>(a: A, b: B, c: C, d: D): R
}

declare module 'date-fns-tz' {
  import type { Day, FirstWeekContainsDate, Locale, LocaleUnit, RoundingMethod } from 'date-fns'

  export type OptionsWithTZ = {
    weekStartsOn?: Day
    firstWeekContainsDate?: FirstWeekContainsDate
    additionalDigits?: 0 | 1 | 2
    timeZone?: string
    originalDate?: Date | number
    locale?: Locale
    includeSeconds?: boolean
    addSuffix?: boolean
    unit?: LocaleUnit
    roundingMethod?: RoundingMethod
    awareOfUnicodeTokens?: boolean
  }
}

// Regular Functions

declare module 'date-fns-tz' {
  import { OptionsWithTZ } from 'date-fns-tz'

  function format(date: Date | number, format: string, options?: OptionsWithTZ): string
  namespace format {}

  function formatInTimeZone(
    date: Date | string | number,
    timeZone: string,
    formatStr: string,
    options?: OptionsWithTZ
  ): string
  namespace formatInTimeZone {}

  function fromZonedTime(
    date: Date | string | number,
    timeZone: string,
    options?: OptionsWithTZ
  ): Date
  namespace fromZonedTime {}

  function getTimezoneOffset(timeZone: string, date?: Date | number): number
  namespace getTimezoneOffset {}

  function toDate(argument: Date | string | number, options?: OptionsWithTZ): Date
  namespace toDate {}

  function toZonedTime(
    date: Date | string | number,
    timeZone: string,
    options?: OptionsWithTZ
  ): Date
  namespace toZonedTime {}
}

declare module 'date-fns-tz/format' {
  export { format } from 'date-fns-tz'
}

declare module 'date-fns-tz/formatInTimeZone' {
  export { formatInTimeZone } from 'date-fns-tz'
}

declare module 'date-fns-tz/fromZonedTime' {
  export { fromZonedTime } from 'date-fns-tz'
}

declare module 'date-fns-tz/getTimezoneOffset' {
  export { getTimezoneOffset } from 'date-fns-tz'
}

declare module 'date-fns-tz/toDate' {
  export { toDate } from 'date-fns-tz'
}

declare module 'date-fns-tz/toZonedTime' {
  export { toZonedTime } from 'date-fns-tz'
}

declare module 'date-fns-tz/format/index' {
  export { format } from 'date-fns-tz'
}

declare module 'date-fns-tz/formatInTimeZone/index' {
  export { formatInTimeZone } from 'date-fns-tz'
}

declare module 'date-fns-tz/fromZonedTime/index' {
  export { fromZonedTime } from 'date-fns-tz'
}

declare module 'date-fns-tz/getTimezoneOffset/index' {
  export { getTimezoneOffset } from 'date-fns-tz'
}

declare module 'date-fns-tz/toDate/index' {
  export { toDate } from 'date-fns-tz'
}

declare module 'date-fns-tz/toZonedTime/index' {
  export { toZonedTime } from 'date-fns-tz'
}

declare module 'date-fns-tz/format/index.js' {
  export { format } from 'date-fns-tz'
}

declare module 'date-fns-tz/formatInTimeZone/index.js' {
  export { formatInTimeZone } from 'date-fns-tz'
}

declare module 'date-fns-tz/fromZonedTime/index.js' {
  export { fromZonedTime } from 'date-fns-tz'
}

declare module 'date-fns-tz/getTimezoneOffset/index.js' {
  export { getTimezoneOffset } from 'date-fns-tz'
}

declare module 'date-fns-tz/toDate/index.js' {
  export { toDate } from 'date-fns-tz'
}

declare module 'date-fns-tz/toZonedTime/index.js' {
  export { toZonedTime } from 'date-fns-tz'
}

// FP Functions

declare module 'date-fns-tz/fp' {
  import { OptionsWithTZ } from 'date-fns-tz'

  const format: CurriedFn2<string, Date | number, string>
  namespace format {}

  const formatInTimeZone: CurriedFn3<string, string, Date | string | number, string>
  namespace formatInTimeZone {}

  const formatInTimeZoneWithOptions: CurriedFn4<
    OptionsWithTZ,
    string,
    string,
    Date | string | number,
    string
  >
  namespace formatInTimeZoneWithOptions {}

  const formatWithOptions: CurriedFn3<OptionsWithTZ, string, Date | number, string>
  namespace formatWithOptions {}

  const fromZonedTime: CurriedFn2<string, Date | string | number, Date>
  namespace fromZonedTime {}

  const fromZonedTimeWithOptions: CurriedFn3<OptionsWithTZ, string, Date | string | number, Date>
  namespace fromZonedTimeWithOptions {}

  const getTimezoneOffset: CurriedFn2<Date | number, string, number>
  namespace getTimezoneOffset {}

  const toDate: CurriedFn1<Date | string | number, Date>
  namespace toDate {}

  const toDateWithOptions: CurriedFn2<OptionsWithTZ, Date | string | number, Date>
  namespace toDateWithOptions {}

  const toZonedTime: CurriedFn2<string, Date | string | number, Date>
  namespace toZonedTime {}

  const toZonedTimeWithOptions: CurriedFn3<OptionsWithTZ, string, Date | string | number, Date>
  namespace toZonedTimeWithOptions {}
}

declare module 'date-fns-tz/fp/format' {
  export { format } from 'date-fns-tz/fp'
}

declare module 'date-fns-tz/fp/formatInTimeZone' {
  export { formatInTimeZone } from 'date-fns-tz/fp'
}

declare module 'date-fns-tz/fp/formatInTimeZoneWithOptions' {
  export { formatInTimeZoneWithOptions } from 'date-fns-tz/fp'
}

declare module 'date-fns-tz/fp/formatWithOptions' {
  export { formatWithOptions } from 'date-fns-tz/fp'
}

declare module 'date-fns-tz/fp/fromZonedTime' {
  export { fromZonedTime } from 'date-fns-tz/fp'
}

declare module 'date-fns-tz/fp/fromZonedTimeWithOptions' {
  export { fromZonedTimeWithOptions } from 'date-fns-tz/fp'
}

declare module 'date-fns-tz/fp/getTimezoneOffset' {
  export { getTimezoneOffset } from 'date-fns-tz/fp'
}

declare module 'date-fns-tz/fp/toDate' {
  export { toDate } from 'date-fns-tz/fp'
}

declare module 'date-fns-tz/fp/toDateWithOptions' {
  export { toDateWithOptions } from 'date-fns-tz/fp'
}

declare module 'date-fns-tz/fp/toZonedTime' {
  export { toZonedTime } from 'date-fns-tz/fp'
}

declare module 'date-fns-tz/fp/toZonedTimeWithOptions' {
  export { toZonedTimeWithOptions } from 'date-fns-tz/fp'
}

declare module 'date-fns-tz/fp/format/index' {
  export { format } from 'date-fns-tz/fp'
}

declare module 'date-fns-tz/fp/formatInTimeZone/index' {
  export { formatInTimeZone } from 'date-fns-tz/fp'
}

declare module 'date-fns-tz/fp/formatInTimeZoneWithOptions/index' {
  export { formatInTimeZoneWithOptions } from 'date-fns-tz/fp'
}

declare module 'date-fns-tz/fp/formatWithOptions/index' {
  export { formatWithOptions } from 'date-fns-tz/fp'
}

declare module 'date-fns-tz/fp/fromZonedTime/index' {
  export { fromZonedTime } from 'date-fns-tz/fp'
}

declare module 'date-fns-tz/fp/fromZonedTimeWithOptions/index' {
  export { fromZonedTimeWithOptions } from 'date-fns-tz/fp'
}

declare module 'date-fns-tz/fp/getTimezoneOffset/index' {
  export { getTimezoneOffset } from 'date-fns-tz/fp'
}

declare module 'date-fns-tz/fp/toDate/index' {
  export { toDate } from 'date-fns-tz/fp'
}

declare module 'date-fns-tz/fp/toDateWithOptions/index' {
  export { toDateWithOptions } from 'date-fns-tz/fp'
}

declare module 'date-fns-tz/fp/toZonedTime/index' {
  export { toZonedTime } from 'date-fns-tz/fp'
}

declare module 'date-fns-tz/fp/toZonedTimeWithOptions/index' {
  export { toZonedTimeWithOptions } from 'date-fns-tz/fp'
}

declare module 'date-fns-tz/fp/format/index.js' {
  export { format } from 'date-fns-tz/fp'
}

declare module 'date-fns-tz/fp/formatInTimeZone/index.js' {
  export { formatInTimeZone } from 'date-fns-tz/fp'
}

declare module 'date-fns-tz/fp/formatInTimeZoneWithOptions/index.js' {
  export { formatInTimeZoneWithOptions } from 'date-fns-tz/fp'
}

declare module 'date-fns-tz/fp/formatWithOptions/index.js' {
  export { formatWithOptions } from 'date-fns-tz/fp'
}

declare module 'date-fns-tz/fp/fromZonedTime/index.js' {
  export { fromZonedTime } from 'date-fns-tz/fp'
}

declare module 'date-fns-tz/fp/fromZonedTimeWithOptions/index.js' {
  export { fromZonedTimeWithOptions } from 'date-fns-tz/fp'
}

declare module 'date-fns-tz/fp/getTimezoneOffset/index.js' {
  export { getTimezoneOffset } from 'date-fns-tz/fp'
}

declare module 'date-fns-tz/fp/toDate/index.js' {
  export { toDate } from 'date-fns-tz/fp'
}

declare module 'date-fns-tz/fp/toDateWithOptions/index.js' {
  export { toDateWithOptions } from 'date-fns-tz/fp'
}

declare module 'date-fns-tz/fp/toZonedTime/index.js' {
  export { toZonedTime } from 'date-fns-tz/fp'
}

declare module 'date-fns-tz/fp/toZonedTimeWithOptions/index.js' {
  export { toZonedTimeWithOptions } from 'date-fns-tz/fp'
}

// ECMAScript Module Functions

declare module 'date-fns-tz/esm' {
  import { OptionsWithTZ } from 'date-fns-tz'

  function format(date: Date | number, format: string, options?: OptionsWithTZ): string
  namespace format {}

  function formatInTimeZone(
    date: Date | string | number,
    timeZone: string,
    formatStr: string,
    options?: OptionsWithTZ
  ): string
  namespace formatInTimeZone {}

  function fromZonedTime(
    date: Date | string | number,
    timeZone: string,
    options?: OptionsWithTZ
  ): Date
  namespace fromZonedTime {}

  function getTimezoneOffset(timeZone: string, date?: Date | number): number
  namespace getTimezoneOffset {}

  function toDate(argument: Date | string | number, options?: OptionsWithTZ): Date
  namespace toDate {}

  function toZonedTime(
    date: Date | string | number,
    timeZone: string,
    options?: OptionsWithTZ
  ): Date
  namespace toZonedTime {}
}

declare module 'date-fns-tz/esm/format' {
  export { format } from 'date-fns-tz/esm'
}

declare module 'date-fns-tz/esm/formatInTimeZone' {
  export { formatInTimeZone } from 'date-fns-tz/esm'
}

declare module 'date-fns-tz/esm/fromZonedTime' {
  export { fromZonedTime } from 'date-fns-tz/esm'
}

declare module 'date-fns-tz/esm/getTimezoneOffset' {
  export { getTimezoneOffset } from 'date-fns-tz/esm'
}

declare module 'date-fns-tz/esm/toDate' {
  export { toDate } from 'date-fns-tz/esm'
}

declare module 'date-fns-tz/esm/toZonedTime' {
  export { toZonedTime } from 'date-fns-tz/esm'
}

declare module 'date-fns-tz/esm/format/index' {
  export { format } from 'date-fns-tz/esm'
}

declare module 'date-fns-tz/esm/formatInTimeZone/index' {
  export { formatInTimeZone } from 'date-fns-tz/esm'
}

declare module 'date-fns-tz/esm/fromZonedTime/index' {
  export { fromZonedTime } from 'date-fns-tz/esm'
}

declare module 'date-fns-tz/esm/getTimezoneOffset/index' {
  export { getTimezoneOffset } from 'date-fns-tz/esm'
}

declare module 'date-fns-tz/esm/toDate/index' {
  export { toDate } from 'date-fns-tz/esm'
}

declare module 'date-fns-tz/esm/toZonedTime/index' {
  export { toZonedTime } from 'date-fns-tz/esm'
}

declare module 'date-fns-tz/esm/format/index.js' {
  export { format } from 'date-fns-tz/esm'
}

declare module 'date-fns-tz/esm/formatInTimeZone/index.js' {
  export { formatInTimeZone } from 'date-fns-tz/esm'
}

declare module 'date-fns-tz/esm/fromZonedTime/index.js' {
  export { fromZonedTime } from 'date-fns-tz/esm'
}

declare module 'date-fns-tz/esm/getTimezoneOffset/index.js' {
  export { getTimezoneOffset } from 'date-fns-tz/esm'
}

declare module 'date-fns-tz/esm/toDate/index.js' {
  export { toDate } from 'date-fns-tz/esm'
}

declare module 'date-fns-tz/esm/toZonedTime/index.js' {
  export { toZonedTime } from 'date-fns-tz/esm'
}

// ECMAScript Module FP Functions

declare module 'date-fns-tz/esm/fp' {
  import { OptionsWithTZ } from 'date-fns-tz'

  const format: CurriedFn2<string, Date | number, string>
  namespace format {}

  const formatInTimeZone: CurriedFn3<string, string, Date | string | number, string>
  namespace formatInTimeZone {}

  const formatInTimeZoneWithOptions: CurriedFn4<
    OptionsWithTZ,
    string,
    string,
    Date | string | number,
    string
  >
  namespace formatInTimeZoneWithOptions {}

  const formatWithOptions: CurriedFn3<OptionsWithTZ, string, Date | number, string>
  namespace formatWithOptions {}

  const fromZonedTime: CurriedFn2<string, Date | string | number, Date>
  namespace fromZonedTime {}

  const fromZonedTimeWithOptions: CurriedFn3<OptionsWithTZ, string, Date | string | number, Date>
  namespace fromZonedTimeWithOptions {}

  const getTimezoneOffset: CurriedFn2<Date | number, string, number>
  namespace getTimezoneOffset {}

  const toDate: CurriedFn1<Date | string | number, Date>
  namespace toDate {}

  const toDateWithOptions: CurriedFn2<OptionsWithTZ, Date | string | number, Date>
  namespace toDateWithOptions {}

  const toZonedTime: CurriedFn2<string, Date | string | number, Date>
  namespace toZonedTime {}

  const toZonedTimeWithOptions: CurriedFn3<OptionsWithTZ, string, Date | string | number, Date>
  namespace toZonedTimeWithOptions {}
}

declare module 'date-fns-tz/esm/fp/format' {
  export { format } from 'date-fns-tz/esm/fp'
}

declare module 'date-fns-tz/esm/fp/formatInTimeZone' {
  export { formatInTimeZone } from 'date-fns-tz/esm/fp'
}

declare module 'date-fns-tz/esm/fp/formatInTimeZoneWithOptions' {
  export { formatInTimeZoneWithOptions } from 'date-fns-tz/esm/fp'
}

declare module 'date-fns-tz/esm/fp/formatWithOptions' {
  export { formatWithOptions } from 'date-fns-tz/esm/fp'
}

declare module 'date-fns-tz/esm/fp/fromZonedTime' {
  export { fromZonedTime } from 'date-fns-tz/esm/fp'
}

declare module 'date-fns-tz/esm/fp/fromZonedTimeWithOptions' {
  export { fromZonedTimeWithOptions } from 'date-fns-tz/esm/fp'
}

declare module 'date-fns-tz/esm/fp/getTimezoneOffset' {
  export { getTimezoneOffset } from 'date-fns-tz/esm/fp'
}

declare module 'date-fns-tz/esm/fp/toDate' {
  export { toDate } from 'date-fns-tz/esm/fp'
}

declare module 'date-fns-tz/esm/fp/toDateWithOptions' {
  export { toDateWithOptions } from 'date-fns-tz/esm/fp'
}

declare module 'date-fns-tz/esm/fp/toZonedTime' {
  export { toZonedTime } from 'date-fns-tz/esm/fp'
}

declare module 'date-fns-tz/esm/fp/toZonedTimeWithOptions' {
  export { toZonedTimeWithOptions } from 'date-fns-tz/esm/fp'
}

declare module 'date-fns-tz/esm/fp/format/index' {
  export { format } from 'date-fns-tz/esm/fp'
}

declare module 'date-fns-tz/esm/fp/formatInTimeZone/index' {
  export { formatInTimeZone } from 'date-fns-tz/esm/fp'
}

declare module 'date-fns-tz/esm/fp/formatInTimeZoneWithOptions/index' {
  export { formatInTimeZoneWithOptions } from 'date-fns-tz/esm/fp'
}

declare module 'date-fns-tz/esm/fp/formatWithOptions/index' {
  export { formatWithOptions } from 'date-fns-tz/esm/fp'
}

declare module 'date-fns-tz/esm/fp/fromZonedTime/index' {
  export { fromZonedTime } from 'date-fns-tz/esm/fp'
}

declare module 'date-fns-tz/esm/fp/fromZonedTimeWithOptions/index' {
  export { fromZonedTimeWithOptions } from 'date-fns-tz/esm/fp'
}

declare module 'date-fns-tz/esm/fp/getTimezoneOffset/index' {
  export { getTimezoneOffset } from 'date-fns-tz/esm/fp'
}

declare module 'date-fns-tz/esm/fp/toDate/index' {
  export { toDate } from 'date-fns-tz/esm/fp'
}

declare module 'date-fns-tz/esm/fp/toDateWithOptions/index' {
  export { toDateWithOptions } from 'date-fns-tz/esm/fp'
}

declare module 'date-fns-tz/esm/fp/toZonedTime/index' {
  export { toZonedTime } from 'date-fns-tz/esm/fp'
}

declare module 'date-fns-tz/esm/fp/toZonedTimeWithOptions/index' {
  export { toZonedTimeWithOptions } from 'date-fns-tz/esm/fp'
}

declare module 'date-fns-tz/esm/fp/format/index.js' {
  export { format } from 'date-fns-tz/esm/fp'
}

declare module 'date-fns-tz/esm/fp/formatInTimeZone/index.js' {
  export { formatInTimeZone } from 'date-fns-tz/esm/fp'
}

declare module 'date-fns-tz/esm/fp/formatInTimeZoneWithOptions/index.js' {
  export { formatInTimeZoneWithOptions } from 'date-fns-tz/esm/fp'
}

declare module 'date-fns-tz/esm/fp/formatWithOptions/index.js' {
  export { formatWithOptions } from 'date-fns-tz/esm/fp'
}

declare module 'date-fns-tz/esm/fp/fromZonedTime/index.js' {
  export { fromZonedTime } from 'date-fns-tz/esm/fp'
}

declare module 'date-fns-tz/esm/fp/fromZonedTimeWithOptions/index.js' {
  export { fromZonedTimeWithOptions } from 'date-fns-tz/esm/fp'
}

declare module 'date-fns-tz/esm/fp/getTimezoneOffset/index.js' {
  export { getTimezoneOffset } from 'date-fns-tz/esm/fp'
}

declare module 'date-fns-tz/esm/fp/toDate/index.js' {
  export { toDate } from 'date-fns-tz/esm/fp'
}

declare module 'date-fns-tz/esm/fp/toDateWithOptions/index.js' {
  export { toDateWithOptions } from 'date-fns-tz/esm/fp'
}

declare module 'date-fns-tz/esm/fp/toZonedTime/index.js' {
  export { toZonedTime } from 'date-fns-tz/esm/fp'
}

declare module 'date-fns-tz/esm/fp/toZonedTimeWithOptions/index.js' {
  export { toZonedTimeWithOptions } from 'date-fns-tz/esm/fp'
}
