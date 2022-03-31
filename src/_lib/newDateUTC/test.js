import assert from 'power-assert'
import newDateUTC from '.'

describe('newDateUTC', function () {
  it('Equivalent to Date.UTC', function () {
    assert.equal(newDateUTC(2020, 0, 1, 0, 0, 0, 0).getTime(), Date.UTC(2020, 0, 1, 0, 0, 0, 0))
    assert.equal(newDateUTC(100, 0, 1, 0, 0, 0, 0).getTime(), Date.UTC(100, 0, 1, 0, 0, 0, 0))
  })

  it('Works with years < 100', function () {
    assert.equal(newDateUTC(99, 0, 1, 0, 0, 0, 0).getTime(), -59042995200000)
  })
})
