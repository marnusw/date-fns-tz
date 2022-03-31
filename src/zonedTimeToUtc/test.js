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
