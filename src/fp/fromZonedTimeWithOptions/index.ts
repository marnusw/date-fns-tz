import { fromZonedTime as fn } from '../../fromZonedTime/index'
import { convertToFP } from '../_lib/convertToFP/index'

export const fromZonedTimeWithOptions = convertToFP(fn, 3)
