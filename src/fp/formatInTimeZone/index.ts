import { formatInTimeZone as fn } from '../../formatInTimeZone/index'
import { convertToFP } from '../_lib/convertToFP/index'

export const formatInTimeZone = convertToFP(fn, 3)
