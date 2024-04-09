import { toZonedTime as fn } from '../../toZonedTime/index'
import { convertToFP } from '../_lib/convertToFP/index'

export const toZonedTimeWithOptions = convertToFP(fn, 3)
