/**
 * A `Date` whose local time getters and setters operate on its UTC values, so the wall clock
 * time it represents never passes through the system time zone.
 *
 * A regular `Date` cannot represent a wall clock time which doesn't exist in the system time
 * zone (i.e. during a DST gap) so it would be shifted by an hour. date-fns preserves the
 * constructor when it clones a date, which means it formats this date consistently in UTC.
 *
 * Only intended for internal use in `formatInTimeZone`; `getTime()` does not return the
 * original instant, but the wall clock time interpreted as UTC.
 */
export class WallClockDate extends Date {
  constructor(...args: unknown[]) {
    if (args.length > 1) {
      super(0)
      const [year, month, day = 1, hours = 0, minutes = 0, seconds = 0, ms = 0] = args as number[]
      this.setUTCFullYear(year, month, day)
      this.setUTCHours(hours, minutes, seconds, ms)
    } else {
      super(...(args as []))
    }
  }

  getTimezoneOffset(): number {
    return 0
  }
}

const methods = ['FullYear', 'Month', 'Date', 'Day', 'Hours', 'Minutes', 'Seconds', 'Milliseconds']
const proto = WallClockDate.prototype as unknown as Record<string, unknown>
const dateProto = Date.prototype as unknown as Record<string, unknown>

methods.forEach((method) => {
  proto['get' + method] = dateProto['getUTC' + method]
  if (method !== 'Day') {
    proto['set' + method] = dateProto['setUTC' + method]
  }
})
