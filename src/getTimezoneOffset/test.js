import assert from 'power-assert'
import getTimezoneOffset from './index'

const hours = 60 * 60 * 1000

describe('getTimezoneOffset', function () {
  it('Empty time zone', function () {
    assert.equal(getTimezoneOffset(''), 0)
  })

  it('Z time zone', function () {
    assert.equal(getTimezoneOffset('Z'), 0)
  })

  it('±hh time zone format', function () {
    assert.equal(getTimezoneOffset('-04'), -4 * hours)
    assert.equal(getTimezoneOffset('+02'), 2 * hours)
  })

  it('±hhmm time zone format', function () {
    assert.equal(getTimezoneOffset('-0430'), -4.5 * hours)
    assert.equal(getTimezoneOffset('+0230'), 2.5 * hours)
  })

  it('±hh:mm time zone format', function () {
    assert.equal(getTimezoneOffset('-05:00'), -5 * hours)
    assert.equal(getTimezoneOffset('+03:00'), 3 * hours)
  })

  it('IANA time zone', function () {
    assert.equal(getTimezoneOffset('America/New_York', new Date(2016, 0, 1)), -5 * hours)
    assert.equal(getTimezoneOffset('America/New_York', new Date(2016, 6, 1)), -4 * hours)
    assert.equal(getTimezoneOffset('Europe/Paris', new Date(2016, 0, 1)), 1 * hours)
    assert.equal(getTimezoneOffset('Europe/Paris', new Date(2016, 6, 1)), 2 * hours)
    assert.equal(getTimezoneOffset('Australia/Sydney', new Date(2016, 0, 1)), 11 * hours)
    assert.equal(getTimezoneOffset('Australia/Sydney', new Date(2016, 6, 1)), 10 * hours)
    assert.equal(getTimezoneOffset('Australia/Adelaide', new Date(2016, 6, 1)), 9.5 * hours)
    assert.equal(getTimezoneOffset('Africa/Johannesburg'), 2 * hours)
  })

  it('bad time zone', function () {
    assert.equal(Number.isNaN(getTimezoneOffset('+0260')), true)
    assert.equal(Number.isNaN(getTimezoneOffset('+02:60')), true)
    assert.equal(Number.isNaN(getTimezoneOffset('Europe/Non_Existing')), true)
  })

  describe('near DST changeover (AEST to AEDT)', function () {
    it('one day before', function () {
      var date = new Date('2020-10-04T00:45:00.000Z')
      assert.equal(getTimezoneOffset('Australia/Melbourne', date), 10 * hours)
    })

    it('15 minutes before', function () {
      var date = new Date('2020-10-04T01:45:00.000Z')
      assert.equal(getTimezoneOffset('Australia/Melbourne', date), 10 * hours)
    })

    it('15 minutes after', function () {
      var date = new Date('2020-10-04T03:15:00.000Z')
      assert.equal(getTimezoneOffset('Australia/Melbourne', date), 11 * hours)
    })
  })
})
