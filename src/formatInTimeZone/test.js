import assert from 'power-assert'
import enGB from 'date-fns/locale/en-GB.js'
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

  describe('populates the timezone name and offset correctly close to DST threshold', function () {
    it('during summer time: CEST', function () {
      var date = new Date('2021-08-01T00:30:00Z')
      var timeZone = 'Europe/Paris'
      var format = 'z XXX'
      var expected = 'CEST +02:00'
      var options = { locale: enGB }
      assert(formatInTimeZone(date, timeZone, format, options) === expected)
    })

    it('during winter time: CET', function () {
      var date = '2021-01-01T01:30:00Z'
      var timeZone = 'Europe/Paris'
      var format = 'z XXX'
      var expected = 'CET +01:00'
      var options = { locale: enGB }
      assert(formatInTimeZone(date, timeZone, format, options) === expected)
    })

    it('before DST changeover: (CEST to CET)', function () {
      var date = '2021-10-31T00:30:00Z'
      var timeZone = 'Europe/Paris'
      var format = 'z XXX'
      var expected = 'CEST +02:00'
      var options = { locale: enGB }
      assert(formatInTimeZone(date, timeZone, format, options) === expected)
    })

    it('after DST changeover: (CEST to CET)', function () {
      var date = '2021-10-31T01:30:00Z'
      var timeZone = 'Europe/Paris'
      var format = 'z XXX'
      var expected = 'CET +01:00'
      var options = { locale: enGB }
      assert(formatInTimeZone(date, timeZone, format, options) === expected)
    })

    it('before DST changeover: (CET to CEST)', function () {
      var date = '2021-03-28T00:30:00Z'
      var timeZone = 'Europe/Paris'
      var format = 'z XXX'
      var expected = 'CET +01:00'
      var options = { locale: enGB }
      assert(formatInTimeZone(date, timeZone, format, options) === expected)
    })

    it('after DST changeover: (CET to CEST)', function () {
      var date = '2021-03-28T01:30:00Z'
      var timeZone = 'Europe/Paris'
      var format = 'z XXX'
      var expected = 'CEST +02:00'
      var options = { locale: enGB }
      assert(formatInTimeZone(date, timeZone, format, options) === expected)
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
