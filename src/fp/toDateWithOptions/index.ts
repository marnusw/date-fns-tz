import { toDate as fn } from '../../toDate/index'
import { convertToFP } from '../_lib/convertToFP/index'

export const toDateWithOptions = convertToFP(fn, 2)
