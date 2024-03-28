/**
 * Converts a function to a curried function that accepts arguments in reverse order.
 *
 * @param fn - The function to convert to FP
 * @param arity - The arity of the function
 * @param curriedArgs - The curried arguments
 *
 * @returns FP version of the function
 *
 * @private
 */
export function convertToFP(fn, arity, curriedArgs) {
  curriedArgs = curriedArgs || []

  if (curriedArgs.length >= arity) {
    return fn.apply(null, curriedArgs.slice(0, arity).reverse())
  }

  return function () {
    var args = Array.prototype.slice.call(arguments)
    return convertToFP(fn, arity, curriedArgs.concat(args))
  }
}
