import assert from 'power-assert'
import { formatInTimeZone } from './index.js'
import { setDefaultOptions } from 'date-fns'
import { vi, enGB, de } from 'date-fns/locale'

describe('formatInTimeZone', function () {
  it('treat date only string in the timezone specified in the options', function () {
    assert.equal(formatInTimeZone('2023-04-16', 'GMT', 'MMM dd', { timeZone: 'GMT' }), 'Apr 16')
  })

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
        assert.equal(formatInTimeZone(date, test.timeZone, test.format), test.expected)
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
      assert.equal(formatInTimeZone(date, timeZone, format, options), expected)
    })

    it('during winter time: CET', function () {
      var date = '2021-01-01T01:30:00Z'
      var timeZone = 'Europe/Paris'
      var format = 'z XXX'
      var expected = 'CET +01:00'
      var options = { locale: enGB }
      assert.equal(formatInTimeZone(date, timeZone, format, options), expected)
    })

    it('before DST changeover: (CEST to CET)', function () {
      var date = '2021-10-31T00:30:00Z'
      var timeZone = 'Europe/Paris'
      var format = 'z XXX'
      var expected = 'CEST +02:00'
      var options = { locale: enGB }
      assert.equal(formatInTimeZone(date, timeZone, format, options), expected)
    })

    it('after DST changeover: (CEST to CET)', function () {
      var date = '2021-10-31T01:30:00Z'
      var timeZone = 'Europe/Paris'
      var format = 'z XXX'
      var expected = 'CET +01:00'
      var options = { locale: enGB }
      assert.equal(formatInTimeZone(date, timeZone, format, options), expected)
    })

    it('before DST changeover: (CET to CEST)', function () {
      var date = '2021-03-28T00:30:00Z'
      var timeZone = 'Europe/Paris'
      var format = 'z XXX'
      var expected = 'CET +01:00'
      var options = { locale: enGB }
      assert.equal(formatInTimeZone(date, timeZone, format, options), expected)
    })

    it('after DST changeover: (CET to CEST)', function () {
      var date = '2021-03-28T01:30:00Z'
      var timeZone = 'Europe/Paris'
      var format = 'z XXX'
      var expected = 'CEST +02:00'
      var options = { locale: enGB }
      assert.equal(formatInTimeZone(date, timeZone, format, options), expected)
    })
  })

  describe('is not affected by DST changes in the system time zone', function () {
    it('formats every hour of a year in UTC', function () {
      var start = Date.UTC(2023, 0, 1)
      var end = Date.UTC(2024, 0, 1)
      for (var time = start; time < end; time += 60 * 60 * 1000) {
        var date = new Date(time)
        var expected = date.toISOString().slice(0, 16).replace('T', ' ')
        assert.equal(formatInTimeZone(date, 'UTC', 'yyyy-MM-dd HH:mm'), expected)
      }
    })

    it('formats every hour of a year in a fixed offset time zone', function () {
      var start = Date.UTC(2023, 0, 1)
      var end = Date.UTC(2024, 0, 1)
      for (var time = start; time < end; time += 60 * 60 * 1000) {
        var date = new Date(time)
        var expected = new Date(time + 9 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 16)
          .replace('T', ' ')
        assert.equal(formatInTimeZone(date, '+09:00', 'yyyy-MM-dd HH:mm'), expected)
      }
    })

    it('formats week, day of year and day period tokens', function () {
      var date = new Date('2023-03-12T02:05:00Z')
      var format = 'I R w Y D EEEE do a h'
      var options = { useAdditionalWeekYearTokens: true, useAdditionalDayOfYearTokens: true }
      assert.equal(
        formatInTimeZone(date, 'UTC', format, options),
        '10 2023 11 2023 71 Sunday 12th AM 2'
      )
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

  describe('setDefaultOptions for locale', function () {
    var date = '1986-04-04T10:32:55.123Z'
    var timeZone = 'Europe/Paris'
    var format = "PPPP 'UTC'xxx"
    var tests = [
      {
        expected: 'Freitag, 4. April 1986 UTC+02:00',
        locale: de,
      },
      {
        expected: 'Thứ Sáu, ngày 4 tháng 04 năm 1986 UTC+02:00',
        locale: vi,
      },
    ]

    tests.forEach(function (test) {
      it(`locale: ${test.locale.code}`, function () {
        setDefaultOptions({ locale: test.locale })
        assert.equal(formatInTimeZone(date, timeZone, format), test.expected)
      })
    })

    afterEach(() => {
      setDefaultOptions({ locale: undefined })
    })
  })

  describe('setDefaultOptions for locale using tzIntlTimeZoneName', function () {
    var date = '1986-04-04T10:32:55.123Z'
    var timeZone = 'Europe/Paris'
    var format = 'dd.MM.yyyy HH:mm zzzz'
    var tests = [
      {
        expected: '04.04.1986 12:32 Mitteleuropäische Sommerzeit',
        locale: de,
      },
      {
        expected: '04.04.1986 12:32 Giờ mùa hè Trung Âu',
        locale: vi,
      },
    ]

    tests.forEach(function (test) {
      it(`locale: ${test.locale.code}`, function () {
        setDefaultOptions({ locale: test.locale })
        assert.equal(formatInTimeZone(date, timeZone, format), test.expected)
      })
    })

    afterEach(() => {
      setDefaultOptions({ locale: undefined })
    })
  })
})
