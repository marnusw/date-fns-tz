import assert from 'power-assert'
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
  })
})
