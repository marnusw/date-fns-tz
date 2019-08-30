import assert from 'power-assert'
import format from 'date-fns/format'
import zonedTimeToLocal from '.'

describe('zonedTimeToLocal', function() {
  process.env.TZ = 'Asia/Jakarta'

  it('returns date Asia/Jakarta ', function() {
    var result = zonedTimeToLocal(
      new Date(2019, 8, 30, 9, 0, 0),
      'America/New_York'
    )
    assert.equal(format(result, 'yyyy-MM-dd HH:mm:ss'), '2019-08-30 20:00:00')
  })
})
