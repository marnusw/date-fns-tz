import assert from 'power-assert'
import tzTokenizeDate from '.'

describe('tzTokenizeDate', function () {
  it('returns year through second tokens of the local date in the time zone', function () {
    var result = tzTokenizeDate(new Date('2014-10-25T13:46:20Z'), 'Asia/Bangkok')
    assert.deepEqual(result, [2014, 10, 25, 20, 46, 20])
  })

  it('returns year through second tokens of UTC time', function () {
    var result = tzTokenizeDate(new Date('2014-10-25T13:46:20Z'), 'UTC')
    assert.deepEqual(result, [2014, 10, 25, 13, 46, 20])
  })

  it('does not wrap to the following day when the result is midnight', function () {
    var result = tzTokenizeDate(
      new Date('2020-01-23T05:00:00.000Z'),
      'America/New_York' // -5 hours
    )
    assert.deepEqual(result, [2020, 1, 23, 0, 0, 0])
  })

  it('works with year < 100', function () {
    var result = tzTokenizeDate(new Date('0099-01-01T00:00:00.000Z'), 'UTC')
    assert.deepEqual(result, [99, 1, 1, 0, 0, 0])
  })

  it('returns NaN when the date string is invalid', function () {
    var result = tzTokenizeDate(new Date('2014-10-25T25:46:20Z'), 'UTC')
    assert(Number.isNaN(result[0]))
  })
})
