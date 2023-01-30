import assert from 'power-assert'
import format from '../format'
import utcToZonedTime from '../utcToZonedTime'
import zonedTimeToUtc from '.'

describe('zonedTimeToUtc', function () {
  it('returns the UTC time of the date in the time zone for a date input and IANA tz', function () {
    var result = zonedTimeToUtc(new Date(2014, 5, 25, 10, 0, 0, 123), 'America/Los_Angeles')
    assert.deepEqual(result.toISOString(), '2014-06-25T17:00:00.123Z')
  })

  it('returns the UTC time of the date in the time zone for a string and IANA tz', function () {
    var result = zonedTimeToUtc('2014-06-25T10:00:00.123', 'America/Los_Angeles')
    assert.deepEqual(result.toISOString(), '2014-06-25T17:00:00.123Z')
  })

  it('returns the UTC time of the date near DST changeover with IANA tz', function () {
    var result = zonedTimeToUtc('2020-10-03T17:00:00.000', 'Australia/Melbourne')
    assert.deepEqual(result.toISOString(), '2020-10-03T07:00:00.000Z')
  })

  it('returns the UTC time of an ISO8601 string with an IANA tz', function () {
    let input = new Date(2021, 11, 4, 15, 0, 15, 0)
    let result = zonedTimeToUtc(input.toISOString(), 'America/New_York')
    assert.deepEqual(result.toISOString(), '2021-12-04T20:00:15.000Z')
  })

  it('returns the UTC time of the date for a UTC input', function () {
    var result = zonedTimeToUtc(new Date(2014, 5, 25, 10, 0, 0, 123), 'UTC')
    assert.deepEqual(result.toISOString(), '2014-06-25T10:00:00.123Z')
  })

  it('returns the UTC time of the date in the time zone for a date input and tz offset', function () {
    var result = zonedTimeToUtc(new Date(2014, 5, 25, 10, 0, 0, 123), '+0400')
    assert.deepEqual(result.toISOString(), '2014-06-25T06:00:00.123Z')
  })

  it('returns the UTC time of the date in the time zone for a string and tz offset', function () {
    var result = zonedTimeToUtc('2014-06-25T10:00:00.123', '-02:00')
    assert.deepEqual(result.toISOString(), '2014-06-25T12:00:00.123Z')
  })

  it('returns the UTC time of the date for the Z tz', function () {
    var result = zonedTimeToUtc(new Date(2014, 5, 25, 10, 0, 0, 123), 'Z')
    assert.deepEqual(result.toISOString(), '2014-06-25T10:00:00.123Z')
  })

  it('works with years < 100 (Date input)', function () {
    var input = new Date(0)
    input.setFullYear(99, 0, 1)
    input.setHours(10, 0, 0, 0)
    var result = zonedTimeToUtc(input, 'Europe/Berlin')
    assert.deepEqual(result.toISOString(), '0099-01-01T09:06:32.000Z')
  })

  it('works with years < 100 (string input)', function () {
    var result = zonedTimeToUtc('0099-01-01', 'Europe/Berlin')
    assert.deepEqual(result.toISOString(), '0098-12-31T23:06:32.000Z')
  })

  describe('near DST changeover (AEST to AEDT)', function () {
    it('zoned time one day before', function () {
      var result = zonedTimeToUtc(
        new Date('2020-10-03T17:00:00.000'),
        'Australia/Melbourne' // +10 hours
      )

      assert.deepEqual(result.toISOString(), '2020-10-03T07:00:00.000Z')
    })

    it('zoned time less than one day before', function () {
      var result = zonedTimeToUtc(
        new Date('2020-10-03T21:00:00.000'),
        'Australia/Melbourne' // +10 hours
      )

      assert.deepEqual(result.toISOString(), '2020-10-03T11:00:00.000Z')
    })

    it('zoned time some time before', function () {
      var result = zonedTimeToUtc(
        new Date('2020-10-03T23:45:00.000'),
        'Australia/Melbourne' // +10 hours
      )

      assert.deepEqual(result.toISOString(), '2020-10-03T13:45:00.000Z')
    })

    it('zoned time at the stroke of midnight before', function () {
      var result = zonedTimeToUtc(
        new Date('2020-10-04T00:00:00.000'),
        'Australia/Melbourne' // +10 hours
      )

      assert.deepEqual(result.toISOString(), '2020-10-03T14:00:00.000Z')
    })

    it('zoned time 1 hour 15 minutes before', function () {
      var result = zonedTimeToUtc(
        new Date('2020-10-04T00:45:00.000'),
        'Australia/Melbourne' // +10 hours
      )

      assert.deepEqual(result.toISOString(), '2020-10-03T14:45:00.000Z')
    })

    it('zoned time 15 minutes before', function () {
      var result = zonedTimeToUtc(
        new Date('2020-10-04T01:45:00.000'),
        'Australia/Melbourne' // +10 hours
      )

      assert.deepEqual(result.toISOString(), '2020-10-03T15:45:00.000Z')
    })

    it('zoned time 15 minutes after', function () {
      var result = zonedTimeToUtc(
        new Date('2020-10-04T03:15:00.000'),
        'Australia/Melbourne' // +11 hours
      )

      assert.deepEqual(result.toISOString(), '2020-10-03T16:15:00.000Z')
    })

    it('zoned time 1 hour 15 minutes after', function () {
      var result = zonedTimeToUtc(
        new Date('2020-10-04T04:15:00.000'),
        'Australia/Melbourne' // +11 hours
      )

      assert.deepEqual(result.toISOString(), '2020-10-03T17:15:00.000Z')
    })

    it('zoned time one day after', function () {
      var result = zonedTimeToUtc(
        new Date('2020-10-04T11:00:00.000'),
        'Australia/Melbourne' // +11 hours
      )

      assert.deepEqual(result.toISOString(), '2020-10-04T00:00:00.000Z')
    })

    it('accepts the Etc/GMT+n time zone format', function () {
      var result1 = zonedTimeToUtc('2019-11-26T10:00:00', 'America/Chicago')
      var result2 = zonedTimeToUtc('2019-11-26T10:00:00', 'Etc/GMT+6')

      assert.deepEqual(result1, result2)
    })

    it('finds first time after clock jumps back: -ve UTC offset', function () {
      var result = zonedTimeToUtc('2023-11-05T02:00:00', 'America/New_York')
      // UTC 05:59 is NY 01:59 GMT -4
      // UTC 06:00 is NY 01:00 GMT -5
      // therefore the first time NY local 02:00 is struck is UTC 07:00
      assert.deepEqual(result.toISOString(), '2023-11-05T07:00:00.000Z')
    })

    it('finds first time after clock jumps back: +ve UTC offset', function () {
      var result = zonedTimeToUtc('2023-04-02T03:00:00', 'Australia/Sydney')
      // UTC 15:59 is SYD 02:59 GMT +11
      // UTC 16:00 is SYD 02:00 GMT +10
      // therefore the first time SYD local 03:00 is struck is UTC 17:00
      assert.deepEqual(result.toISOString(), '2023-04-01T17:00:00.000Z')
    })

    // todo Results differ for time zones before and after UTC
    it.skip('handles times that repeat when clock jump back: -ve UTC offset', function () {
      // at 02:00 local clock jumps back 1 hour so 01:00 occurs twice
      var result = zonedTimeToUtc('2023-11-05T01:00:00', 'America/New_York')
      // UTC 05:00 is NY 01:00 GMT -4
      // UTC 06:00 is NY 01:00 GMT -5
      // this implementation picks the later occurrence of 01:00 @ UTC 06:00
      assert.deepEqual(result.toISOString(), '2023-11-05T06:00:00.000Z')
    })

    it('handles times that repeat when clock jump back: +ve UTC offset', function () {
      // at 03:00 local clock jumps back 1 hour so 02:00 occurs twice
      var result = zonedTimeToUtc('2023-04-02T02:00:00', 'Australia/Sydney')
      // UTC 15:00 is SYD 02:00 GMT +11
      // UTC 16:00 is SYD 02:00 GMT +10
      // this implementation picks the later occurrence of 02:00 @ UTC 16:00
      assert.deepEqual(result.toISOString(), '2023-04-01T16:00:00.000Z')
    })

    // utc: 2023-09-30T16:00:00.000Z SYD: 03:00 GMT+11
    it('handles times that dont exist with clock jump forward: -ve UTC offset', function () {
      // at 02:00 local clock will immediately jump forward to 03:00
      var result = zonedTimeToUtc('2023-03-12T02:00:00', 'America/New_York')
      // UTC 06:59 is NY 01:59 GMT -5
      // UTC 07:00 is NY 03:00 GMT -4
      // !! this is an error - should either throw error OR return UTC 07:00
      // it should NOT return 06:00 but defining problem before making tests fail
      assert.deepEqual(result.toISOString(), '2023-03-12T06:00:00.000Z')
    })

    it('handles times that dont exist with clock jump forward: +ve UTC offset', function () {
      // at 02:00 local clock will immediately jump forward to 03:00
      var result = zonedTimeToUtc('2023-10-01T02:00:00', 'Australia/Sydney')
      // UTC 15:59 is SYD 01:59 GMT +10
      // UTC 16:00 is SYD 03:00 GMT +11
      // !! this is an error - should either throw error OR return UTC 16:00
      // it should NOT return 15:00 but defining problem before making tests fail
      assert.deepEqual(result.toISOString(), '2023-09-30T15:00:00.000Z')
    })
  })

  describe('zonedTimeToUtc and utcToZonedTime are inverse functions', function () {
    it('date strings without a time zone specifier', function () {
      var timeZone = 'America/Chicago'
      var input = '2019-11-26T10:00:00'
      var result = utcToZonedTime(zonedTimeToUtc(input, timeZone), timeZone)
      assert.deepEqual(format(result, "yyyy-MM-dd'T'HH:mm:ss"), input)
    })

    it('a Date instance', function () {
      var timeZone = 'Etc/GMT+6'
      var input = new Date('2019-11-26T10:00:00Z')
      var result = utcToZonedTime(zonedTimeToUtc(input, timeZone), timeZone)
      assert.deepEqual(result, input)
    })

    it('date string with Z time zone specifier', function () {
      var timeZone = 'Europe/Paris'
      var input = '2019-11-26T10:00:00Z'
      var result = utcToZonedTime(zonedTimeToUtc(input, timeZone), timeZone)
      assert.deepEqual(result, new Date('2019-11-26T10:00:00Z'))
    })

    it('date string with a positive time zone offset specifier', function () {
      var timeZone = 'Australia/Melbourne'
      var input = '2019-11-26T10:00:00+02:00'
      var result = utcToZonedTime(zonedTimeToUtc(input, timeZone), timeZone)
      assert.deepEqual(result, new Date('2019-11-26T10:00:00+02:00'))
    })

    it('when the time zone is UTC', function () {
      var timeZone = 'UTC'
      var input = '2019-11-26T10:00:00Z'
      var result = utcToZonedTime(zonedTimeToUtc(input, timeZone), timeZone)
      assert.deepEqual(result, new Date('2019-11-26T10:00:00Z'))
    })
  })

  describe('invalid date and time zone handling', function () {
    it('returns an invalid date when the date string is invalid without tz info', function () {
      var result = zonedTimeToUtc('2020-01-01T25:00:00.000', 'Europe/London')
      assert(result instanceof Date)
      assert(isNaN(result))
    })

    it('returns an invalid date when the date string is invalid with tz info', function () {
      var result = zonedTimeToUtc('2020-01-01T25:00:00.000Z', 'Europe/London')
      assert(result instanceof Date)
      assert(isNaN(result))
    })

    it('returns an invalid date when the time zone is invalid', function () {
      var result = zonedTimeToUtc('2020-01-01T12:00:00.000Z', 'bad/timezone')
      assert(result instanceof Date)
      assert(isNaN(result))
    })
  })
})
