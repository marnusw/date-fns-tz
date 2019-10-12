import assert from 'power-assert'
import format from 'date-fns/format'
import utcToZonedTime from '.'

describe('utcToZonedTime', function() {
  it('returns the equivalent date at the time zone for a date string and IANA tz', function() {
    var result = utcToZonedTime('2014-06-25T10:00:00.123Z', 'America/New_York')
    assert.equal(
      format(result, "yyyy-MM-dd'T'HH:mm:ss.SSS"),
      '2014-06-25T06:00:00.123'
    )
  })

  it('returns the equivalent date at the time zone for a date instance and IANA tz', function() {
    var result = utcToZonedTime(
      new Date('2014-06-25T10:00:00.123Z'),
      'Europe/Paris'
    )
    assert.equal(
      format(result, "yyyy-MM-dd'T'HH:mm:ss.SSS"),
      '2014-06-25T12:00:00.123'
    )
  })

  it('returns the same date/time for UTC', function() {
    var result = utcToZonedTime('2014-06-25T10:00:00.123Z', 'UTC')
    assert.equal(
      format(result, "yyyy-MM-dd'T'HH:mm:ss.SSS"),
      '2014-06-25T10:00:00.123'
    )
  })

  it('returns the equivalent date at the time zone for a date string and tz offset', function() {
    var result = utcToZonedTime('2014-06-25T10:00:00.123Z', '-04:00')
    assert.equal(
      format(result, "yyyy-MM-dd'T'HH:mm:ss.SSS"),
      '2014-06-25T06:00:00.123'
    )
  })

  it('returns the equivalent date at the time zone for a date instance and tz offset', function() {
    var result = utcToZonedTime(new Date('2014-06-25T10:00:00.123Z'), '+0200')
    assert.equal(
      format(result, "yyyy-MM-dd'T'HH:mm:ss.SSS"),
      '2014-06-25T12:00:00.123'
    )
  })

  it('returns the same date/time for Z', function() {
    var result = utcToZonedTime('2014-06-25T10:00:00.123Z', 'Z')
    assert.equal(
      format(result, "yyyy-MM-dd'T'HH:mm:ss.SSS"),
      '2014-06-25T10:00:00.123'
    )
  })
})
