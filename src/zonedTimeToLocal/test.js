import assert from 'power-assert'
import zonedTimeToLocal from '.'
import utcToZonedTime from '../utcToZonedTime'
import format from 'date-fns/format'

describe('zonedTimeToLocal', function() {
  it('changes the date from new york timezone to the local time', () => {
    const result = zonedTimeToLocal('2019-08-30T10:00:00', 'America/New_York')

    const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const localTime = utcToZonedTime("2019-08-30T14:00:00.000Z'", localTimezone)

    assert.equal(
      format(result, "yyyy-MM-dd'T'HH:mm:ss"),
      format(localTime, "yyyy-MM-dd'T'HH:mm:ss")
    )
  })

  it('changes the date from paris to the local time', () => {
    const result = zonedTimeToLocal('2019-08-30T10:00:00', 'Europe/Paris')

    const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const localTime = utcToZonedTime("2019-08-30T08:00:00.000Z'", localTimezone)

    assert.equal(
      format(result, "yyyy-MM-dd'T'HH:mm:ss"),
      format(localTime, "yyyy-MM-dd'T'HH:mm:ss")
    )
  })
})
