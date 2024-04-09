import { getTimezoneOffset as fn } from '../../getTimezoneOffset/index'
import { convertToFP } from '../_lib/convertToFP/index'

export const getTimezoneOffset = convertToFP(fn, 2)
