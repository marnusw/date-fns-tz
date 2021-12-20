import assert from 'power-assert'
import format from 'date-fns/format'
import utcToZonedTime from '.'

describe('utcToZonedTime', function () {
  it('returns the equivalent date at the time zone for a date string and IANA tz', function () {
    var result = utcToZonedTime('2014-06-25T10:00:00.123Z', 'America/New_York')
    assert.equal(format(result, "yyyy-MM-dd'T'HH:mm:ss.SSS"), '2014-06-25T06:00:00.123')
  })

  it('returns the equivalent date at the time zone for a date instance and IANA tz', function () {
    var result = utcToZonedTime(new Date('2014-06-25T10:00:00.123Z'), 'Europe/Paris')
    assert.equal(format(result, "yyyy-MM-dd'T'HH:mm:ss.SSS"), '2014-06-25T12:00:00.123')
  })

  it('returns the same date/time for UTC', function () {
    var result = utcToZonedTime('2014-06-25T10:00:00.123Z', 'UTC')
    assert.equal(format(result, "yyyy-MM-dd'T'HH:mm:ss.SSS"), '2014-06-25T10:00:00.123')
  })

  it('returns the equivalent date at the time zone for a date string and tz offset', function () {
    var result = utcToZonedTime('2014-06-25T10:00:00.123Z', '-04:00')
    assert.equal(format(result, "yyyy-MM-dd'T'HH:mm:ss.SSS"), '2014-06-25T06:00:00.123')
  })

  it('returns the equivalent date at the time zone for a date instance and tz offset', function () {
    var result = utcToZonedTime(new Date('2014-06-25T10:00:00.123Z'), '+0200')
    assert.equal(format(result, "yyyy-MM-dd'T'HH:mm:ss.SSS"), '2014-06-25T12:00:00.123')
  })

  it('returns the same date/time for Z', function () {
    var result = utcToZonedTime('2014-06-25T10:00:00.123Z', 'Z')
    assert.equal(format(result, "yyyy-MM-dd'T'HH:mm:ss.SSS"), '2014-06-25T10:00:00.123')
  })

  it('does not wrap to the following day when the result is midnight', function () {
    var result = utcToZonedTime(
      new Date('Thu Jan 23 2020 05:00:00 GMT+0000 (Greenwich Mean Time)'),
      'America/New_York' // -5 hours
    )
    assert.equal(format(result, "yyyy-MM-dd'T'HH:mm:ss.SSS"), '2020-01-23T00:00:00.000')
  })

  it('returns the correct date/time during time change', function () {
    // zoned time one day behind
    var resultPDT = utcToZonedTime(
      new Date('Sun Nov 1 2020 06:45:00 GMT-0000 (Greenwich Mean Time)'),
      'America/Los_Angeles' // -7 hours
    )

    assert.equal(format(resultPDT, "yyyy-MM-dd'T'HH:mm:ss.SSS"), '2020-10-31T23:45:00.000')

    // 15 mins before time switch
    resultPDT = utcToZonedTime(
      new Date('Sun Nov 1 2020 08:45:00 GMT-0000 (Greenwich Mean Time)'),
      'America/Los_Angeles' // -7 hours
    )

    assert.equal(format(resultPDT, "yyyy-MM-dd'T'HH:mm:ss.SSS"), '2020-11-01T01:45:00.000')

    // 15 mins after time switch
    var resultPST = utcToZonedTime(
      new Date('Sun Nov 1 2020 09:45:00 GMT-0000 (Greenwich Mean Time)'),
      'America/Los_Angeles' // -8 hours
    )

    assert.equal(format(resultPST, "yyyy-MM-dd'T'HH:mm:ss.SSS"), '2020-11-01T01:45:00.000')
  })

  it('works in specific time zones', function () {
    var timeZone = 'America/Vancouver'
    var result = utcToZonedTime('2020-03-08T19:00:00.000Z', timeZone)
    assert.equal(format(result, 'yyyy-MM-dd hh:mm:ss.SSS'), '2020-03-08 12:00:00.000')
  })

  it('returns an invalid date when the time zone is invalid', function () {
    var result = utcToZonedTime('2020-03-08T19:00:00.000Z', 'bad/timeZone')
    assert(result instanceof Date)
    assert(isNaN(result))
  })
})
