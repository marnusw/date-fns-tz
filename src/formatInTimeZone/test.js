import assert from 'power-assert'
import formatInTimeZone from './index'

describe('formatInTimeZone', function () {
  describe('shifts the date to the zoned time and formats', function () {
    var date = '1986-04-04T10:32:55.123Z'
    var tests = [
      {
        expected: '04.04.1986 12:32 UTC+02:00',
        format: "dd.MM.yyyy HH:mm 'UTC'xxx",
        formatType: 'offset',
        timeZoneType: 'name',
        timeZone: 'Europe/Paris',
      },
      {
        expected: '04.04.1986 12:32 UTC+02:00',
        format: "dd.MM.yyyy HH:mm 'UTC'xxx",
        formatType: 'offset',
        timeZoneType: 'offset',
        timeZone: '+02:00',
      },
      {
        expected: '04.04.1986 12:32 Central European Summer Time',
        format: 'dd.MM.yyyy HH:mm zzzz',
        formatType: 'name',
        timeZoneType: 'name',
        timeZone: 'Europe/Paris',
      },
      // It might not be possible to get the timezone name from an offset, since Intl.DTF expects an IANA time zone
      // {
      //   expected: '04.04.1986 12:32 Central European Summer Time',
      //   format: 'dd.MM.yyyy HH:mm zzzz',
      //   formatType: 'name',
      //   timeZoneType: 'offset',
      //   timeZone: '+02:00',
      // },
    ]

    tests.forEach(function (test) {
      it(`format type: ${test.formatType}, time zone type: ${test.timeZoneType}`, function () {
        assert(formatInTimeZone(date, test.timeZone, test.format) === test.expected)
      })
    })
  })

  it('throws a RangeError on invalid time zones', function () {
    var date = '1986-04-04T10:32:55.123Z'
    assert.throws(
      formatInTimeZone.bind(null, date, '02:65', "dd.MM.yyyy HH:mm 'UTC'xxx"),
      RangeError
    )
    assert.throws(
      formatInTimeZone.bind(null, date, 'bad/timezone', "dd.MM.yyyy HH:mm 'UTC'xxx"),
      RangeError
    )
  })
})
