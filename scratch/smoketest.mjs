import { formatInTimeZone } from '../tmp/package/esm/index.js'

const date = new Date('2014-10-25T10:46:20Z')
const actual = formatInTimeZone(date, 'America/New_York', 'yyyy-MM-dd HH:mm:ssXXX')
const expected = '2014-10-25 06:46:20-04:00'

if (actual !== expected) {
  throw new Error('MJS smoketest failed')
} else {
  console.info('MJS smoketest passed')
}
