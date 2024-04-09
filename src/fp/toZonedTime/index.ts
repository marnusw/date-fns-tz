import { toZonedTime as fn } from '../../toZonedTime/index'
import { convertToFP } from '../_lib/convertToFP/index'

export const toZonedTime = convertToFP(fn, 2)
