// @flow
/* eslint-env mocha */

import assert from 'power-assert'
import formatInTimeZone from '../formatInTimeZone'
import addInTimeZone from '.'

describe('addInTimeZone', () => {
  const fmt = 'yyyy-MM-dd HH:mm:ss.SSS'

  it('adds days to a date, with timezone awareness', () => {
    // add a day to this time in Halifax and you cross a DST boundary; in LA you don't
    const start = '2022-11-05T06:12:34.567Z'
    const startTime = new Date(start).getTime()

    // Halifax
    assert(formatInTimeZone(start, 'America/Halifax', fmt) === '2022-11-05 03:12:34.567')
    const oneDayLaterInHalifax = addInTimeZone(start, 'America/Halifax', { days: 1 })
    // +25 hrs in Halifax because clock fell back at 2am
    assert(oneDayLaterInHalifax.getTime() - startTime === 25 * 60 * 60 * 1000)
    assert(
      formatInTimeZone(oneDayLaterInHalifax, 'America/Halifax', fmt) === '2022-11-06 03:12:34.567'
    )

    // LA
    assert(formatInTimeZone(start, 'America/Los_Angeles', fmt) === '2022-11-04 23:12:34.567')
    const oneDayLaterInLA = addInTimeZone(start, 'America/Los_Angeles', { days: 1 })
    // +24 hrs in LA because clock didn't fall back yet
    assert(oneDayLaterInLA.getTime() - startTime === 24 * 60 * 60 * 1000)
    assert(
      formatInTimeZone(oneDayLaterInLA, 'America/Los_Angeles', fmt) === '2022-11-05 23:12:34.567'
    )

    // to sum up,
    assert(oneDayLaterInHalifax.getTime() === oneDayLaterInLA.getTime() + 60 * 60 * 1000)
  })

  it('adds days + hours to a date, with timezone awareness', () => {
    // add a day plus 3 hours to this time, and you'll cross a DST boundary
    // in both Halifax and LA
    const start = '2022-11-05T06:12:34.567Z'
    const startTime = new Date(start).getTime()
    // but in Halifax you cross it adding the day; in LA you cross it adding hours
    // i.e. in Halifax you add a 25-hr day plus 3 hrs = 28 hrs, and clock time is +3 hrs
    //    in LA you add a 24-hr day plus 3 hrs = 27 hrs, and clock time is +2 hrs

    // Halifax: 11/05 3:12am
    //   + 1 day = 11/06 3:12am (25 hrs because clock fell back at 2am)
    //   + 3 hrs = 11/06 6:12am
    //   total 28 hrs
    assert(formatInTimeZone(start, 'America/Halifax', fmt) === '2022-11-05 03:12:34.567')
    const laterInHalifax = addInTimeZone(start, 'America/Halifax', { days: 1, hours: 3 })
    // + 28 hrs
    assert(laterInHalifax.getTime() - startTime === 28 * 60 * 60 * 1000)
    // clock time is +3 hrs
    assert(formatInTimeZone(laterInHalifax, 'America/Halifax', fmt) === '2022-11-06 06:12:34.567')

    // LA: 11/04 11:12pm
    //   + 1 day = 11/05 11:12pm (24 hrs because clock didn't fall back yet)
    //   + 3 hrs = 11/06 1:12am (fall back at 2am)
    //   total 27 hrs
    assert(formatInTimeZone(start, 'America/Los_Angeles', fmt) === '2022-11-04 23:12:34.567')
    const laterInLA = addInTimeZone(start, 'America/Los_Angeles', { days: 1, hours: 3 })
    // + 27 hrs
    assert(laterInLA.getTime() - startTime === 27 * 60 * 60 * 1000)
    // clock time is +2 hrs
    assert(formatInTimeZone(laterInLA, 'America/Los_Angeles', fmt) === '2022-11-06 01:12:34.567')
  })

  it('adds months with timezone awareness', () => {
    // add a month to this time in Halifax and you cross a DST boundary; in LA you don't
    const start = '2022-10-06T06:12:34.567Z'
    const startTime = new Date(start).getTime()

    // Halifax
    assert(formatInTimeZone(start, 'America/Halifax', fmt) === '2022-10-06 03:12:34.567')
    const oneDayLaterInHalifax = addInTimeZone(start, 'America/Halifax', { months: 1 })
    // +31 days + 1 hr in Halifax, because clock fell back at 2am
    assert(oneDayLaterInHalifax.getTime() - startTime === (31 * 24 + 1) * 60 * 60 * 1000)
    assert(
      formatInTimeZone(oneDayLaterInHalifax, 'America/Halifax', fmt) === '2022-11-06 03:12:34.567'
    )

    // LA
    assert(formatInTimeZone(start, 'America/Los_Angeles', fmt) === '2022-10-05 23:12:34.567')
    const oneDayLaterInLA = addInTimeZone(start, 'America/Los_Angeles', { months: 1 })
    // +31 days + 0 hrs in LA, because clock didn't fall back yet
    assert(oneDayLaterInLA.getTime() - startTime === 31 * 24 * 60 * 60 * 1000)
    assert(
      formatInTimeZone(oneDayLaterInLA, 'America/Los_Angeles', fmt) === '2022-11-05 23:12:34.567'
    )

    // to sum up,
    assert(oneDayLaterInHalifax.getTime() === oneDayLaterInLA.getTime() + 60 * 60 * 1000)
  })
})
