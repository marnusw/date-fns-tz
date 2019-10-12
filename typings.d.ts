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
  import { Locale } from 'date-fns'

  export type OptionsWithTZ = {
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
    firstWeekContainsDate?: 1 | 2 | 3 | 4 | 5 | 6 | 7
    additionalDigits?: 0 | 1 | 2
    timeZone?: string
    locale?: Locale
    includeSeconds?: boolean
    addSuffix?: boolean
    unit?: 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year'
    roundingMethod?: 'floor' | 'ceil' | 'round'
    awareOfUnicodeTokens?: boolean
  }
}

// Regular Functions

declare module 'date-fns-tz' {
  import { OptionsWithTZ } from 'date-fns-tz'

  function format(
    date: Date | string | number,
    format: string,
    options?: OptionsWithTZ
  ): string
  namespace format {}

  function toDate(
    argument: Date | string | number,
    options?: OptionsWithTZ
  ): Date
  namespace toDate {}

  function utcToZonedTime(
    date: Date | string | number,
    timeZone: string,
    options?: OptionsWithTZ
  ): Date
  namespace utcToZonedTime {}

  function zonedTimeToUtc(
    date: Date | string | number,
    timeZone: string,
    options?: OptionsWithTZ
  ): Date
  namespace zonedTimeToUtc {}
}

declare module 'date-fns-tz/format' {
  import { format } from 'date-fns-tz'
  export = format
}

declare module 'date-fns-tz/toDate' {
  import { toDate } from 'date-fns-tz'
  export = toDate
}

declare module 'date-fns-tz/utcToZonedTime' {
  import { utcToZonedTime } from 'date-fns-tz'
  export = utcToZonedTime
}

declare module 'date-fns-tz/zonedTimeToUtc' {
  import { zonedTimeToUtc } from 'date-fns-tz'
  export = zonedTimeToUtc
}

declare module 'date-fns-tz/format/index' {
  import { format } from 'date-fns-tz'
  export = format
}

declare module 'date-fns-tz/toDate/index' {
  import { toDate } from 'date-fns-tz'
  export = toDate
}

declare module 'date-fns-tz/utcToZonedTime/index' {
  import { utcToZonedTime } from 'date-fns-tz'
  export = utcToZonedTime
}

declare module 'date-fns-tz/zonedTimeToUtc/index' {
  import { zonedTimeToUtc } from 'date-fns-tz'
  export = zonedTimeToUtc
}

declare module 'date-fns-tz/format/index.js' {
  import { format } from 'date-fns-tz'
  export = format
}

declare module 'date-fns-tz/toDate/index.js' {
  import { toDate } from 'date-fns-tz'
  export = toDate
}

declare module 'date-fns-tz/utcToZonedTime/index.js' {
  import { utcToZonedTime } from 'date-fns-tz'
  export = utcToZonedTime
}

declare module 'date-fns-tz/zonedTimeToUtc/index.js' {
  import { zonedTimeToUtc } from 'date-fns-tz'
  export = zonedTimeToUtc
}

// FP Functions

declare module 'date-fns-tz/fp' {
  import { OptionsWithTZ } from 'date-fns-tz'

  const format: CurriedFn2<string, Date | string | number, string>
  namespace format {}

  const formatWithOptions: CurriedFn3<
    OptionsWithTZ,
    string,
    Date | string | number,
    string
  >
  namespace formatWithOptions {}

  const toDate: CurriedFn1<Date | string | number, Date>
  namespace toDate {}

  const toDateWithOptions: CurriedFn2<
    OptionsWithTZ,
    Date | string | number,
    Date
  >
  namespace toDateWithOptions {}

  const utcToZonedTime: CurriedFn2<string, Date | string | number, Date>
  namespace utcToZonedTime {}

  const utcToZonedTimeWithOptions: CurriedFn3<
    OptionsWithTZ,
    string,
    Date | string | number,
    Date
  >
  namespace utcToZonedTimeWithOptions {}

  const zonedTimeToUtc: CurriedFn2<string, Date | string | number, Date>
  namespace zonedTimeToUtc {}

  const zonedTimeToUtcWithOptions: CurriedFn3<
    OptionsWithTZ,
    string,
    Date | string | number,
    Date
  >
  namespace zonedTimeToUtcWithOptions {}
}

declare module 'date-fns-tz/fp/format' {
  import { format } from 'date-fns-tz/fp'
  export = format
}

declare module 'date-fns-tz/fp/formatWithOptions' {
  import { formatWithOptions } from 'date-fns-tz/fp'
  export = formatWithOptions
}

declare module 'date-fns-tz/fp/toDate' {
  import { toDate } from 'date-fns-tz/fp'
  export = toDate
}

declare module 'date-fns-tz/fp/toDateWithOptions' {
  import { toDateWithOptions } from 'date-fns-tz/fp'
  export = toDateWithOptions
}

declare module 'date-fns-tz/fp/utcToZonedTime' {
  import { utcToZonedTime } from 'date-fns-tz/fp'
  export = utcToZonedTime
}

declare module 'date-fns-tz/fp/utcToZonedTimeWithOptions' {
  import { utcToZonedTimeWithOptions } from 'date-fns-tz/fp'
  export = utcToZonedTimeWithOptions
}

declare module 'date-fns-tz/fp/zonedTimeToUtc' {
  import { zonedTimeToUtc } from 'date-fns-tz/fp'
  export = zonedTimeToUtc
}

declare module 'date-fns-tz/fp/zonedTimeToUtcWithOptions' {
  import { zonedTimeToUtcWithOptions } from 'date-fns-tz/fp'
  export = zonedTimeToUtcWithOptions
}

declare module 'date-fns-tz/fp/format/index' {
  import { format } from 'date-fns-tz/fp'
  export = format
}

declare module 'date-fns-tz/fp/formatWithOptions/index' {
  import { formatWithOptions } from 'date-fns-tz/fp'
  export = formatWithOptions
}

declare module 'date-fns-tz/fp/toDate/index' {
  import { toDate } from 'date-fns-tz/fp'
  export = toDate
}

declare module 'date-fns-tz/fp/toDateWithOptions/index' {
  import { toDateWithOptions } from 'date-fns-tz/fp'
  export = toDateWithOptions
}

declare module 'date-fns-tz/fp/utcToZonedTime/index' {
  import { utcToZonedTime } from 'date-fns-tz/fp'
  export = utcToZonedTime
}

declare module 'date-fns-tz/fp/utcToZonedTimeWithOptions/index' {
  import { utcToZonedTimeWithOptions } from 'date-fns-tz/fp'
  export = utcToZonedTimeWithOptions
}

declare module 'date-fns-tz/fp/zonedTimeToUtc/index' {
  import { zonedTimeToUtc } from 'date-fns-tz/fp'
  export = zonedTimeToUtc
}

declare module 'date-fns-tz/fp/zonedTimeToUtcWithOptions/index' {
  import { zonedTimeToUtcWithOptions } from 'date-fns-tz/fp'
  export = zonedTimeToUtcWithOptions
}

declare module 'date-fns-tz/fp/format/index.js' {
  import { format } from 'date-fns-tz/fp'
  export = format
}

declare module 'date-fns-tz/fp/formatWithOptions/index.js' {
  import { formatWithOptions } from 'date-fns-tz/fp'
  export = formatWithOptions
}

declare module 'date-fns-tz/fp/toDate/index.js' {
  import { toDate } from 'date-fns-tz/fp'
  export = toDate
}

declare module 'date-fns-tz/fp/toDateWithOptions/index.js' {
  import { toDateWithOptions } from 'date-fns-tz/fp'
  export = toDateWithOptions
}

declare module 'date-fns-tz/fp/utcToZonedTime/index.js' {
  import { utcToZonedTime } from 'date-fns-tz/fp'
  export = utcToZonedTime
}

declare module 'date-fns-tz/fp/utcToZonedTimeWithOptions/index.js' {
  import { utcToZonedTimeWithOptions } from 'date-fns-tz/fp'
  export = utcToZonedTimeWithOptions
}

declare module 'date-fns-tz/fp/zonedTimeToUtc/index.js' {
  import { zonedTimeToUtc } from 'date-fns-tz/fp'
  export = zonedTimeToUtc
}

declare module 'date-fns-tz/fp/zonedTimeToUtcWithOptions/index.js' {
  import { zonedTimeToUtcWithOptions } from 'date-fns-tz/fp'
  export = zonedTimeToUtcWithOptions
}

// ECMAScript Module Functions

declare module 'date-fns-tz/esm' {
  import { OptionsWithTZ } from 'date-fns-tz'

  function format(
    date: Date | string | number,
    format: string,
    options?: OptionsWithTZ
  ): string
  namespace format {}

  function toDate(
    argument: Date | string | number,
    options?: OptionsWithTZ
  ): Date
  namespace toDate {}

  function utcToZonedTime(
    date: Date | string | number,
    timeZone: string,
    options?: OptionsWithTZ
  ): Date
  namespace utcToZonedTime {}

  function zonedTimeToUtc(
    date: Date | string | number,
    timeZone: string,
    options?: OptionsWithTZ
  ): Date
  namespace zonedTimeToUtc {}
}

declare module 'date-fns-tz/esm/format' {
  import { format } from 'date-fns-tz/esm'
  export default format
}

declare module 'date-fns-tz/esm/toDate' {
  import { toDate } from 'date-fns-tz/esm'
  export default toDate
}

declare module 'date-fns-tz/esm/utcToZonedTime' {
  import { utcToZonedTime } from 'date-fns-tz/esm'
  export default utcToZonedTime
}

declare module 'date-fns-tz/esm/zonedTimeToUtc' {
  import { zonedTimeToUtc } from 'date-fns-tz/esm'
  export default zonedTimeToUtc
}

declare module 'date-fns-tz/esm/format/index' {
  import { format } from 'date-fns-tz/esm'
  export default format
}

declare module 'date-fns-tz/esm/toDate/index' {
  import { toDate } from 'date-fns-tz/esm'
  export default toDate
}

declare module 'date-fns-tz/esm/utcToZonedTime/index' {
  import { utcToZonedTime } from 'date-fns-tz/esm'
  export default utcToZonedTime
}

declare module 'date-fns-tz/esm/zonedTimeToUtc/index' {
  import { zonedTimeToUtc } from 'date-fns-tz/esm'
  export default zonedTimeToUtc
}

declare module 'date-fns-tz/esm/format/index.js' {
  import { format } from 'date-fns-tz/esm'
  export default format
}

declare module 'date-fns-tz/esm/toDate/index.js' {
  import { toDate } from 'date-fns-tz/esm'
  export default toDate
}

declare module 'date-fns-tz/esm/utcToZonedTime/index.js' {
  import { utcToZonedTime } from 'date-fns-tz/esm'
  export default utcToZonedTime
}

declare module 'date-fns-tz/esm/zonedTimeToUtc/index.js' {
  import { zonedTimeToUtc } from 'date-fns-tz/esm'
  export default zonedTimeToUtc
}

// ECMAScript Module FP Functions

declare module 'date-fns-tz/esm/fp' {
  import { OptionsWithTZ } from 'date-fns-tz'

  const format: CurriedFn2<string, Date | string | number, string>
  namespace format {}

  const formatWithOptions: CurriedFn3<
    OptionsWithTZ,
    string,
    Date | string | number,
    string
  >
  namespace formatWithOptions {}

  const toDate: CurriedFn1<Date | string | number, Date>
  namespace toDate {}

  const toDateWithOptions: CurriedFn2<
    OptionsWithTZ,
    Date | string | number,
    Date
  >
  namespace toDateWithOptions {}

  const utcToZonedTime: CurriedFn2<string, Date | string | number, Date>
  namespace utcToZonedTime {}

  const utcToZonedTimeWithOptions: CurriedFn3<
    OptionsWithTZ,
    string,
    Date | string | number,
    Date
  >
  namespace utcToZonedTimeWithOptions {}

  const zonedTimeToUtc: CurriedFn2<string, Date | string | number, Date>
  namespace zonedTimeToUtc {}

  const zonedTimeToUtcWithOptions: CurriedFn3<
    OptionsWithTZ,
    string,
    Date | string | number,
    Date
  >
  namespace zonedTimeToUtcWithOptions {}
}

declare module 'date-fns-tz/esm/fp/format' {
  import { format } from 'date-fns-tz/esm/fp'
  export default format
}

declare module 'date-fns-tz/esm/fp/formatWithOptions' {
  import { formatWithOptions } from 'date-fns-tz/esm/fp'
  export default formatWithOptions
}

declare module 'date-fns-tz/esm/fp/toDate' {
  import { toDate } from 'date-fns-tz/esm/fp'
  export default toDate
}

declare module 'date-fns-tz/esm/fp/toDateWithOptions' {
  import { toDateWithOptions } from 'date-fns-tz/esm/fp'
  export default toDateWithOptions
}

declare module 'date-fns-tz/esm/fp/utcToZonedTime' {
  import { utcToZonedTime } from 'date-fns-tz/esm/fp'
  export default utcToZonedTime
}

declare module 'date-fns-tz/esm/fp/utcToZonedTimeWithOptions' {
  import { utcToZonedTimeWithOptions } from 'date-fns-tz/esm/fp'
  export default utcToZonedTimeWithOptions
}

declare module 'date-fns-tz/esm/fp/zonedTimeToUtc' {
  import { zonedTimeToUtc } from 'date-fns-tz/esm/fp'
  export default zonedTimeToUtc
}

declare module 'date-fns-tz/esm/fp/zonedTimeToUtcWithOptions' {
  import { zonedTimeToUtcWithOptions } from 'date-fns-tz/esm/fp'
  export default zonedTimeToUtcWithOptions
}

declare module 'date-fns-tz/esm/fp/format/index' {
  import { format } from 'date-fns-tz/esm/fp'
  export default format
}

declare module 'date-fns-tz/esm/fp/formatWithOptions/index' {
  import { formatWithOptions } from 'date-fns-tz/esm/fp'
  export default formatWithOptions
}

declare module 'date-fns-tz/esm/fp/toDate/index' {
  import { toDate } from 'date-fns-tz/esm/fp'
  export default toDate
}

declare module 'date-fns-tz/esm/fp/toDateWithOptions/index' {
  import { toDateWithOptions } from 'date-fns-tz/esm/fp'
  export default toDateWithOptions
}

declare module 'date-fns-tz/esm/fp/utcToZonedTime/index' {
  import { utcToZonedTime } from 'date-fns-tz/esm/fp'
  export default utcToZonedTime
}

declare module 'date-fns-tz/esm/fp/utcToZonedTimeWithOptions/index' {
  import { utcToZonedTimeWithOptions } from 'date-fns-tz/esm/fp'
  export default utcToZonedTimeWithOptions
}

declare module 'date-fns-tz/esm/fp/zonedTimeToUtc/index' {
  import { zonedTimeToUtc } from 'date-fns-tz/esm/fp'
  export default zonedTimeToUtc
}

declare module 'date-fns-tz/esm/fp/zonedTimeToUtcWithOptions/index' {
  import { zonedTimeToUtcWithOptions } from 'date-fns-tz/esm/fp'
  export default zonedTimeToUtcWithOptions
}

declare module 'date-fns-tz/esm/fp/format/index.js' {
  import { format } from 'date-fns-tz/esm/fp'
  export default format
}

declare module 'date-fns-tz/esm/fp/formatWithOptions/index.js' {
  import { formatWithOptions } from 'date-fns-tz/esm/fp'
  export default formatWithOptions
}

declare module 'date-fns-tz/esm/fp/toDate/index.js' {
  import { toDate } from 'date-fns-tz/esm/fp'
  export default toDate
}

declare module 'date-fns-tz/esm/fp/toDateWithOptions/index.js' {
  import { toDateWithOptions } from 'date-fns-tz/esm/fp'
  export default toDateWithOptions
}

declare module 'date-fns-tz/esm/fp/utcToZonedTime/index.js' {
  import { utcToZonedTime } from 'date-fns-tz/esm/fp'
  export default utcToZonedTime
}

declare module 'date-fns-tz/esm/fp/utcToZonedTimeWithOptions/index.js' {
  import { utcToZonedTimeWithOptions } from 'date-fns-tz/esm/fp'
  export default utcToZonedTimeWithOptions
}

declare module 'date-fns-tz/esm/fp/zonedTimeToUtc/index.js' {
  import { zonedTimeToUtc } from 'date-fns-tz/esm/fp'
  export default zonedTimeToUtc
}

declare module 'date-fns-tz/esm/fp/zonedTimeToUtcWithOptions/index.js' {
  import { zonedTimeToUtcWithOptions } from 'date-fns-tz/esm/fp'
  export default zonedTimeToUtcWithOptions
}
