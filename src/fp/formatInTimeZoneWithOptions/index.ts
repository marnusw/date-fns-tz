import { formatInTimeZone as fn } from '../../formatInTimeZone/index'
import { convertToFP } from '../_lib/convertToFP/index'

export const formatInTimeZoneWithOptions = convertToFP(fn, 4)
