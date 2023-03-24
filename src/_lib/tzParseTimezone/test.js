import assert from 'power-assert'
import tzParseTimezone from '.'

describe('tzParseTimezone', function () {
  it('Empty time zone', function () {
    assert.equal(tzParseTimezone(''), 0)
  })

  it('Z time zone', function () {
    assert.equal(tzParseTimezone('Z'), 0)
  })

  it('±hh time zone format', function () {
    assert.equal(tzParseTimezone('-11'), 660 * 60 * 1000)
    assert.equal(tzParseTimezone('-04'), 240 * 60 * 1000)
    assert.equal(tzParseTimezone('+02'), -120 * 60 * 1000)
    assert.equal(tzParseTimezone('+11'), -660 * 60 * 1000)
    assert.equal(tzParseTimezone('+12'), -720 * 60 * 1000)
  })

  it('±hhmm time zone format', function () {
    assert.equal(tzParseTimezone('-0430'), 270 * 60 * 1000)
    assert.equal(tzParseTimezone('-0030'), 30 * 60 * 1000)
    assert.equal(tzParseTimezone('+0230'), -150 * 60 * 1000)
    assert.equal(tzParseTimezone('+0030'), -30 * 60 * 1000)
  })

  it('±hh:mm time zone format', function () {
    assert.equal(tzParseTimezone('-23:59'), 1439 * 60 * 1000)
    assert.equal(tzParseTimezone('-12:00'), 720 * 60 * 1000)
    assert.equal(tzParseTimezone('-11:30'), 690 * 60 * 1000)
    assert.equal(tzParseTimezone('-05:00'), 300 * 60 * 1000)
    assert.equal(tzParseTimezone('-00:30'), 30 * 60 * 1000)
    assert.equal(tzParseTimezone('+03:00'), -180 * 60 * 1000)
    assert.equal(tzParseTimezone('+11:30'), -690 * 60 * 1000)
    assert.equal(tzParseTimezone('+12:00'), -720 * 60 * 1000)
    assert.equal(tzParseTimezone('+23:59'), -1439 * 60 * 1000)
    assert.equal(tzParseTimezone('+00:30'), -30 * 60 * 1000)
  })

  it('IANA time zone', function () {
    var date = new Date('2014-10-25T13:46:20.000Z')
    assert.equal(tzParseTimezone('America/New_York', date), 240 * 60 * 1000)
    assert.equal(tzParseTimezone('Europe/Paris', date), -120 * 60 * 1000)
    assert.equal(tzParseTimezone('Asia/Ust-Nera', date), -660 * 60 * 1000)
  })

  it('bad time zone', function () {
    assert.equal(Number.isNaN(tzParseTimezone('-24')), true)
    assert.equal(Number.isNaN(tzParseTimezone('-24:00')), true)
    assert.equal(Number.isNaN(tzParseTimezone('+25')), true)
    assert.equal(Number.isNaN(tzParseTimezone('+0260')), true)
    assert.equal(Number.isNaN(tzParseTimezone('+02:60')), true)
    assert.equal(Number.isNaN(tzParseTimezone('+24:30')), true)
    assert.equal(Number.isNaN(tzParseTimezone('Europe/Non_Existing')), true)
  })

  describe('near DST changeover (AEST to AEDT)', function () {
    it('one day before', function () {
      var date = new Date('2020-10-04T00:45:00.000Z')
      assert.equal(tzParseTimezone('Australia/Melbourne', date), -10 * 60 * 60 * 1000)
    })

    it('15 minutes before', function () {
      var date = new Date('2020-10-04T01:45:00.000Z')
      assert.equal(tzParseTimezone('Australia/Melbourne', date), -10 * 60 * 60 * 1000)
    })

    it('15 minutes after', function () {
      var date = new Date('2020-10-04T03:15:00.000Z')
      assert.equal(tzParseTimezone('Australia/Melbourne', date), -11 * 60 * 60 * 1000)
    })
  })
})
