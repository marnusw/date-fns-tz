import assert from 'power-assert'
import formatAsZonedTime from './index'

describe('formatAsZonedTime', function () {
  it('shifts the date to the zoned time and formats', function () {
    var date = '1986-04-04T10:32:55.123Z'
    var timeZone = 'Europe/Paris'
    var result = formatAsZonedTime(date, timeZone, "dd.MM.yyyy HH:mm 'UTC'xxx")
    assert(result === '04.04.1986 12:32 UTC+02:00')
  })

  it('throws a RangeError on invalid time zones', function () {
    var date = '1986-04-04T10:32:55.123Z'
    assert.throws(
      formatAsZonedTime.bind(null, date, '02:65', "dd.MM.yyyy HH:mm 'UTC'xxx"),
      RangeError
    )
    assert.throws(
      formatAsZonedTime.bind(null, date, 'bad/timezone', "dd.MM.yyyy HH:mm 'UTC'xxx"),
      RangeError
    )
  })
})
