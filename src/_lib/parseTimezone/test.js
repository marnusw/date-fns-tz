import assert from 'power-assert'
import parseTimezone from '.'

describe('parseTimezone', function () {
  it('Empty time zone', function () {
    assert.equal(parseTimezone(''), 0)
  })

  it('Z time zone', function () {
    assert.equal(parseTimezone('Z'), 0)
  })

  it('±hh time zone format', function () {
    assert.equal(parseTimezone('-04'), 240 * 60 * 1000)
    assert.equal(parseTimezone('+02'), -120 * 60 * 1000)
  })

  it('±hhmm time zone format', function () {
    assert.equal(parseTimezone('-0430'), 270 * 60 * 1000)
    assert.equal(parseTimezone('+0230'), -150 * 60 * 1000)
  })

  it('±hh:mm time zone format', function () {
    assert.equal(parseTimezone('-05:00'), 300 * 60 * 1000)
    assert.equal(parseTimezone('+03:00'), -180 * 60 * 1000)
  })

  it('IANA time zone', function () {
    var date = new Date('2014-10-25T13:46:20Z')
    assert.equal(parseTimezone('America/New_York', date), 240 * 60 * 1000)
    assert.equal(parseTimezone('Europe/Paris', date), -120 * 60 * 1000)
  })
})
