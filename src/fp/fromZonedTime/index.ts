import { fromZonedTime as fn } from '../../fromZonedTime/index'
import { convertToFP } from '../_lib/convertToFP/index'

export const fromZonedTime = convertToFP(fn, 2)
