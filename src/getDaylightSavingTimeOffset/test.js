import assert from 'power-assert'
import { getDaylightSavingTimeOffset } from './index.js'

describe('getDaylightSavingTimeOffset', () => {
  it('returns 0 for UTC (no DST)', () => {
    const date = new Date('2025-03-15T00:00:00Z')
    assert.equal(getDaylightSavingTimeOffset(date, 'UTC'), 0)
  })

  it('detects DST in northern hemisphere summer (New York)', () => {
    const date = new Date('2025-07-01T12:00:00Z')
    assert.equal(getDaylightSavingTimeOffset(date, 'America/New_York'), 60)
  })

  it('returns 0 in northern hemisphere winter (New York)', () => {
    const date = new Date('2025-01-15T12:00:00Z')
    assert.equal(getDaylightSavingTimeOffset(date, 'America/New_York'), 0)
  })

  it('detects DST in southern hemisphere summer (Sydney)', () => {
    const date = new Date('2025-01-15T12:00:00Z')
    assert.equal(getDaylightSavingTimeOffset(date, 'Australia/Sydney'), 60)
  })

  it('returns 0 in southern hemisphere winter (Sydney)', () => {
    const date = new Date('2025-07-15T12:00:00Z')
    assert.equal(getDaylightSavingTimeOffset(date, 'Australia/Sydney'), 0)
  })

  it('shows 0 for a zone without DST (Africa/Johannesburg)', () => {
    const date = new Date('2025-06-15T12:00:00Z')
    assert.equal(getDaylightSavingTimeOffset(date, 'Africa/Johannesburg'), 0)
  })
})
