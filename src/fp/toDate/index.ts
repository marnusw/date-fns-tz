import { toDate as fn } from '../../toDate/index'
import { convertToFP } from '../_lib/convertToFP/index'

export const toDate = convertToFP(fn, 1)
