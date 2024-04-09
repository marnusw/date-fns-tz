import { format as fn } from '../../format/index'
import { convertToFP } from '../_lib/convertToFP/index'

export const format = convertToFP(fn, 2)
