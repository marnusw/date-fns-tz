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
  import { format } from 'date-fns-tz'
  export = format
}

declare module 'date-fns-tz/formatInTimeZone' {
  import { formatInTimeZone } from 'date-fns-tz'
  export = formatInTimeZone
}

declare module 'date-fns-tz/fromZonedTime' {
  import { fromZonedTime } from 'date-fns-tz'
  export = fromZonedTime
}

declare module 'date-fns-tz/getTimezoneOffset' {
  import { getTimezoneOffset } from 'date-fns-tz'
  export = getTimezoneOffset
}

declare module 'date-fns-tz/toDate' {
  import { toDate } from 'date-fns-tz'
  export = toDate
}

declare module 'date-fns-tz/toZonedTime' {
  import { toZonedTime } from 'date-fns-tz'
  export = toZonedTime
}

declare module 'date-fns-tz/format/index' {
  import { format } from 'date-fns-tz'
  export = format
}

declare module 'date-fns-tz/formatInTimeZone/index' {
  import { formatInTimeZone } from 'date-fns-tz'
  export = formatInTimeZone
}

declare module 'date-fns-tz/fromZonedTime/index' {
  import { fromZonedTime } from 'date-fns-tz'
  export = fromZonedTime
}

declare module 'date-fns-tz/getTimezoneOffset/index' {
  import { getTimezoneOffset } from 'date-fns-tz'
  export = getTimezoneOffset
}

declare module 'date-fns-tz/toDate/index' {
  import { toDate } from 'date-fns-tz'
  export = toDate
}

declare module 'date-fns-tz/toZonedTime/index' {
  import { toZonedTime } from 'date-fns-tz'
  export = toZonedTime
}

declare module 'date-fns-tz/format/index.js' {
  import { format } from 'date-fns-tz'
  export = format
}

declare module 'date-fns-tz/formatInTimeZone/index.js' {
  import { formatInTimeZone } from 'date-fns-tz'
  export = formatInTimeZone
}

declare module 'date-fns-tz/fromZonedTime/index.js' {
  import { fromZonedTime } from 'date-fns-tz'
  export = fromZonedTime
}

declare module 'date-fns-tz/getTimezoneOffset/index.js' {
  import { getTimezoneOffset } from 'date-fns-tz'
  export = getTimezoneOffset
}

declare module 'date-fns-tz/toDate/index.js' {
  import { toDate } from 'date-fns-tz'
  export = toDate
}

declare module 'date-fns-tz/toZonedTime/index.js' {
  import { toZonedTime } from 'date-fns-tz'
  export = toZonedTime
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
  import { format } from 'date-fns-tz/fp'
  export = format
}

declare module 'date-fns-tz/fp/formatInTimeZone' {
  import { formatInTimeZone } from 'date-fns-tz/fp'
  export = formatInTimeZone
}

declare module 'date-fns-tz/fp/formatInTimeZoneWithOptions' {
  import { formatInTimeZoneWithOptions } from 'date-fns-tz/fp'
  export = formatInTimeZoneWithOptions
}

declare module 'date-fns-tz/fp/formatWithOptions' {
  import { formatWithOptions } from 'date-fns-tz/fp'
  export = formatWithOptions
}

declare module 'date-fns-tz/fp/fromZonedTime' {
  import { fromZonedTime } from 'date-fns-tz/fp'
  export = fromZonedTime
}

declare module 'date-fns-tz/fp/fromZonedTimeWithOptions' {
  import { fromZonedTimeWithOptions } from 'date-fns-tz/fp'
  export = fromZonedTimeWithOptions
}

declare module 'date-fns-tz/fp/getTimezoneOffset' {
  import { getTimezoneOffset } from 'date-fns-tz/fp'
  export = getTimezoneOffset
}

declare module 'date-fns-tz/fp/toDate' {
  import { toDate } from 'date-fns-tz/fp'
  export = toDate
}

declare module 'date-fns-tz/fp/toDateWithOptions' {
  import { toDateWithOptions } from 'date-fns-tz/fp'
  export = toDateWithOptions
}

declare module 'date-fns-tz/fp/toZonedTime' {
  import { toZonedTime } from 'date-fns-tz/fp'
  export = toZonedTime
}

declare module 'date-fns-tz/fp/toZonedTimeWithOptions' {
  import { toZonedTimeWithOptions } from 'date-fns-tz/fp'
  export = toZonedTimeWithOptions
}

declare module 'date-fns-tz/fp/format/index' {
  import { format } from 'date-fns-tz/fp'
  export = format
}

declare module 'date-fns-tz/fp/formatInTimeZone/index' {
  import { formatInTimeZone } from 'date-fns-tz/fp'
  export = formatInTimeZone
}

declare module 'date-fns-tz/fp/formatInTimeZoneWithOptions/index' {
  import { formatInTimeZoneWithOptions } from 'date-fns-tz/fp'
  export = formatInTimeZoneWithOptions
}

declare module 'date-fns-tz/fp/formatWithOptions/index' {
  import { formatWithOptions } from 'date-fns-tz/fp'
  export = formatWithOptions
}

declare module 'date-fns-tz/fp/fromZonedTime/index' {
  import { fromZonedTime } from 'date-fns-tz/fp'
  export = fromZonedTime
}

declare module 'date-fns-tz/fp/fromZonedTimeWithOptions/index' {
  import { fromZonedTimeWithOptions } from 'date-fns-tz/fp'
  export = fromZonedTimeWithOptions
}

declare module 'date-fns-tz/fp/getTimezoneOffset/index' {
  import { getTimezoneOffset } from 'date-fns-tz/fp'
  export = getTimezoneOffset
}

declare module 'date-fns-tz/fp/toDate/index' {
  import { toDate } from 'date-fns-tz/fp'
  export = toDate
}

declare module 'date-fns-tz/fp/toDateWithOptions/index' {
  import { toDateWithOptions } from 'date-fns-tz/fp'
  export = toDateWithOptions
}

declare module 'date-fns-tz/fp/toZonedTime/index' {
  import { toZonedTime } from 'date-fns-tz/fp'
  export = toZonedTime
}

declare module 'date-fns-tz/fp/toZonedTimeWithOptions/index' {
  import { toZonedTimeWithOptions } from 'date-fns-tz/fp'
  export = toZonedTimeWithOptions
}

declare module 'date-fns-tz/fp/format/index.js' {
  import { format } from 'date-fns-tz/fp'
  export = format
}

declare module 'date-fns-tz/fp/formatInTimeZone/index.js' {
  import { formatInTimeZone } from 'date-fns-tz/fp'
  export = formatInTimeZone
}

declare module 'date-fns-tz/fp/formatInTimeZoneWithOptions/index.js' {
  import { formatInTimeZoneWithOptions } from 'date-fns-tz/fp'
  export = formatInTimeZoneWithOptions
}

declare module 'date-fns-tz/fp/formatWithOptions/index.js' {
  import { formatWithOptions } from 'date-fns-tz/fp'
  export = formatWithOptions
}

declare module 'date-fns-tz/fp/fromZonedTime/index.js' {
  import { fromZonedTime } from 'date-fns-tz/fp'
  export = fromZonedTime
}

declare module 'date-fns-tz/fp/fromZonedTimeWithOptions/index.js' {
  import { fromZonedTimeWithOptions } from 'date-fns-tz/fp'
  export = fromZonedTimeWithOptions
}

declare module 'date-fns-tz/fp/getTimezoneOffset/index.js' {
  import { getTimezoneOffset } from 'date-fns-tz/fp'
  export = getTimezoneOffset
}

declare module 'date-fns-tz/fp/toDate/index.js' {
  import { toDate } from 'date-fns-tz/fp'
  export = toDate
}

declare module 'date-fns-tz/fp/toDateWithOptions/index.js' {
  import { toDateWithOptions } from 'date-fns-tz/fp'
  export = toDateWithOptions
}

declare module 'date-fns-tz/fp/toZonedTime/index.js' {
  import { toZonedTime } from 'date-fns-tz/fp'
  export = toZonedTime
}

declare module 'date-fns-tz/fp/toZonedTimeWithOptions/index.js' {
  import { toZonedTimeWithOptions } from 'date-fns-tz/fp'
  export = toZonedTimeWithOptions
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
  import { format } from 'date-fns-tz/esm'
  export default format
}

declare module 'date-fns-tz/esm/formatInTimeZone' {
  import { formatInTimeZone } from 'date-fns-tz/esm'
  export default formatInTimeZone
}

declare module 'date-fns-tz/esm/fromZonedTime' {
  import { fromZonedTime } from 'date-fns-tz/esm'
  export default fromZonedTime
}

declare module 'date-fns-tz/esm/getTimezoneOffset' {
  import { getTimezoneOffset } from 'date-fns-tz/esm'
  export default getTimezoneOffset
}

declare module 'date-fns-tz/esm/toDate' {
  import { toDate } from 'date-fns-tz/esm'
  export default toDate
}

declare module 'date-fns-tz/esm/toZonedTime' {
  import { toZonedTime } from 'date-fns-tz/esm'
  export default toZonedTime
}

declare module 'date-fns-tz/esm/format/index' {
  import { format } from 'date-fns-tz/esm'
  export default format
}

declare module 'date-fns-tz/esm/formatInTimeZone/index' {
  import { formatInTimeZone } from 'date-fns-tz/esm'
  export default formatInTimeZone
}

declare module 'date-fns-tz/esm/fromZonedTime/index' {
  import { fromZonedTime } from 'date-fns-tz/esm'
  export default fromZonedTime
}

declare module 'date-fns-tz/esm/getTimezoneOffset/index' {
  import { getTimezoneOffset } from 'date-fns-tz/esm'
  export default getTimezoneOffset
}

declare module 'date-fns-tz/esm/toDate/index' {
  import { toDate } from 'date-fns-tz/esm'
  export default toDate
}

declare module 'date-fns-tz/esm/toZonedTime/index' {
  import { toZonedTime } from 'date-fns-tz/esm'
  export default toZonedTime
}

declare module 'date-fns-tz/esm/format/index.js' {
  import { format } from 'date-fns-tz/esm'
  export default format
}

declare module 'date-fns-tz/esm/formatInTimeZone/index.js' {
  import { formatInTimeZone } from 'date-fns-tz/esm'
  export default formatInTimeZone
}

declare module 'date-fns-tz/esm/fromZonedTime/index.js' {
  import { fromZonedTime } from 'date-fns-tz/esm'
  export default fromZonedTime
}

declare module 'date-fns-tz/esm/getTimezoneOffset/index.js' {
  import { getTimezoneOffset } from 'date-fns-tz/esm'
  export default getTimezoneOffset
}

declare module 'date-fns-tz/esm/toDate/index.js' {
  import { toDate } from 'date-fns-tz/esm'
  export default toDate
}

declare module 'date-fns-tz/esm/toZonedTime/index.js' {
  import { toZonedTime } from 'date-fns-tz/esm'
  export default toZonedTime
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
  import { format } from 'date-fns-tz/esm/fp'
  export default format
}

declare module 'date-fns-tz/esm/fp/formatInTimeZone' {
  import { formatInTimeZone } from 'date-fns-tz/esm/fp'
  export default formatInTimeZone
}

declare module 'date-fns-tz/esm/fp/formatInTimeZoneWithOptions' {
  import { formatInTimeZoneWithOptions } from 'date-fns-tz/esm/fp'
  export default formatInTimeZoneWithOptions
}

declare module 'date-fns-tz/esm/fp/formatWithOptions' {
  import { formatWithOptions } from 'date-fns-tz/esm/fp'
  export default formatWithOptions
}

declare module 'date-fns-tz/esm/fp/fromZonedTime' {
  import { fromZonedTime } from 'date-fns-tz/esm/fp'
  export default fromZonedTime
}

declare module 'date-fns-tz/esm/fp/fromZonedTimeWithOptions' {
  import { fromZonedTimeWithOptions } from 'date-fns-tz/esm/fp'
  export default fromZonedTimeWithOptions
}

declare module 'date-fns-tz/esm/fp/getTimezoneOffset' {
  import { getTimezoneOffset } from 'date-fns-tz/esm/fp'
  export default getTimezoneOffset
}

declare module 'date-fns-tz/esm/fp/toDate' {
  import { toDate } from 'date-fns-tz/esm/fp'
  export default toDate
}

declare module 'date-fns-tz/esm/fp/toDateWithOptions' {
  import { toDateWithOptions } from 'date-fns-tz/esm/fp'
  export default toDateWithOptions
}

declare module 'date-fns-tz/esm/fp/toZonedTime' {
  import { toZonedTime } from 'date-fns-tz/esm/fp'
  export default toZonedTime
}

declare module 'date-fns-tz/esm/fp/toZonedTimeWithOptions' {
  import { toZonedTimeWithOptions } from 'date-fns-tz/esm/fp'
  export default toZonedTimeWithOptions
}

declare module 'date-fns-tz/esm/fp/format/index' {
  import { format } from 'date-fns-tz/esm/fp'
  export default format
}

declare module 'date-fns-tz/esm/fp/formatInTimeZone/index' {
  import { formatInTimeZone } from 'date-fns-tz/esm/fp'
  export default formatInTimeZone
}

declare module 'date-fns-tz/esm/fp/formatInTimeZoneWithOptions/index' {
  import { formatInTimeZoneWithOptions } from 'date-fns-tz/esm/fp'
  export default formatInTimeZoneWithOptions
}

declare module 'date-fns-tz/esm/fp/formatWithOptions/index' {
  import { formatWithOptions } from 'date-fns-tz/esm/fp'
  export default formatWithOptions
}

declare module 'date-fns-tz/esm/fp/fromZonedTime/index' {
  import { fromZonedTime } from 'date-fns-tz/esm/fp'
  export default fromZonedTime
}

declare module 'date-fns-tz/esm/fp/fromZonedTimeWithOptions/index' {
  import { fromZonedTimeWithOptions } from 'date-fns-tz/esm/fp'
  export default fromZonedTimeWithOptions
}

declare module 'date-fns-tz/esm/fp/getTimezoneOffset/index' {
  import { getTimezoneOffset } from 'date-fns-tz/esm/fp'
  export default getTimezoneOffset
}

declare module 'date-fns-tz/esm/fp/toDate/index' {
  import { toDate } from 'date-fns-tz/esm/fp'
  export default toDate
}

declare module 'date-fns-tz/esm/fp/toDateWithOptions/index' {
  import { toDateWithOptions } from 'date-fns-tz/esm/fp'
  export default toDateWithOptions
}

declare module 'date-fns-tz/esm/fp/toZonedTime/index' {
  import { toZonedTime } from 'date-fns-tz/esm/fp'
  export default toZonedTime
}

declare module 'date-fns-tz/esm/fp/toZonedTimeWithOptions/index' {
  import { toZonedTimeWithOptions } from 'date-fns-tz/esm/fp'
  export default toZonedTimeWithOptions
}

declare module 'date-fns-tz/esm/fp/format/index.js' {
  import { format } from 'date-fns-tz/esm/fp'
  export default format
}

declare module 'date-fns-tz/esm/fp/formatInTimeZone/index.js' {
  import { formatInTimeZone } from 'date-fns-tz/esm/fp'
  export default formatInTimeZone
}

declare module 'date-fns-tz/esm/fp/formatInTimeZoneWithOptions/index.js' {
  import { formatInTimeZoneWithOptions } from 'date-fns-tz/esm/fp'
  export default formatInTimeZoneWithOptions
}

declare module 'date-fns-tz/esm/fp/formatWithOptions/index.js' {
  import { formatWithOptions } from 'date-fns-tz/esm/fp'
  export default formatWithOptions
}

declare module 'date-fns-tz/esm/fp/fromZonedTime/index.js' {
  import { fromZonedTime } from 'date-fns-tz/esm/fp'
  export default fromZonedTime
}

declare module 'date-fns-tz/esm/fp/fromZonedTimeWithOptions/index.js' {
  import { fromZonedTimeWithOptions } from 'date-fns-tz/esm/fp'
  export default fromZonedTimeWithOptions
}

declare module 'date-fns-tz/esm/fp/getTimezoneOffset/index.js' {
  import { getTimezoneOffset } from 'date-fns-tz/esm/fp'
  export default getTimezoneOffset
}

declare module 'date-fns-tz/esm/fp/toDate/index.js' {
  import { toDate } from 'date-fns-tz/esm/fp'
  export default toDate
}

declare module 'date-fns-tz/esm/fp/toDateWithOptions/index.js' {
  import { toDateWithOptions } from 'date-fns-tz/esm/fp'
  export default toDateWithOptions
}

declare module 'date-fns-tz/esm/fp/toZonedTime/index.js' {
  import { toZonedTime } from 'date-fns-tz/esm/fp'
  export default toZonedTime
}

declare module 'date-fns-tz/esm/fp/toZonedTimeWithOptions/index.js' {
  import { toZonedTimeWithOptions } from 'date-fns-tz/esm/fp'
  export default toZonedTimeWithOptions
}
