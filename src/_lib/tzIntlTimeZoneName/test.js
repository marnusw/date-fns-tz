import assert from 'power-assert'
import tzIntlTimeZoneName from '.'

describe('tzIntlTimeZoneName', function () {
  it('returns the short time zone name', function () {
    var date = new Date('2014-10-25T13:46:20Z')
    var timeZone = 'Europe/Paris'
    var result = tzIntlTimeZoneName('short', date, { timeZone })

    // When no locale is specified the system locale is used
    var expectedResult = Intl.DateTimeFormat(undefined, {
      timeZone,
      timeZoneName: 'short',
    })
      .format(date)
      .match(/ [\w-+ ]+$/)[0]
      .trim()

    assert.equal(result, expectedResult)
  })

  it('returns year through second tokens of the local date in the time zone', function () {
    var date = new Date('2014-10-25T13:46:20Z')
    var timeZone = 'Europe/Paris'
    var result = tzIntlTimeZoneName('long', date, { timeZone })

    // When no locale is specified the system locale is used
    var expectedResult = Intl.DateTimeFormat(undefined, {
      timeZone,
      timeZoneName: 'long',
    })
      .format(date)
      .match(/ [\w-+ ]+$/)[0]
      .trim()

    assert.equal(result, expectedResult)
  })

  it('returns the short time zone name in the specified locale', function () {
    var locale = { code: 'en-GB' }
    var date = new Date('2014-10-25T13:46:20Z')
    var timeZone = 'Europe/Paris'
    var result = tzIntlTimeZoneName('short', date, { timeZone, locale })
    assert.equal(result, 'CEST')
  })

  it('returns year through second tokens of the local date in the time zone', function () {
    var locale = { code: 'en-GB' }
    var date = new Date('2014-10-25T13:46:20Z')
    var timeZone = 'Europe/Paris'
    var result = tzIntlTimeZoneName('long', date, { timeZone, locale })
    assert.equal(result, 'Central European Summer Time')
  })

  it('an invalid time zone throws a range error', function () {
    var locale = { code: 'en-GB' }
    var date = new Date('2014-10-25T13:46:20Z')
    var timeZone = 'bad/timeZone'
    assert.throws(tzIntlTimeZoneName.bind(null, 'long', date, { timeZone, locale }), RangeError)
  })

  it('returns the short time zone name in the vi locale', function () {
    var locale = { code: 'vi' }
    var date = new Date('2014-10-25T13:46:20Z')
    var timeZone = 'Europe/Paris'
    var result = tzIntlTimeZoneName('short', date, { timeZone, locale })
    assert.equal(result, 'GMT+2')
  })
})
