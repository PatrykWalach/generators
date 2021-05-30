import { iter, next } from '../iter'
import { BaseError, ignore, StopIteration } from '../util'

export const string = (a: string, b: string) => a.localeCompare(b)

export const number = (a: number | bigint, b: number | bigint) =>
  a < b ? -1 : a > b ? 1 : 0

export const reversed = <T>(comparator: (a: T, b: T) => number) => (
  a: T,
  b: T,
) => comparator(a, b) * -1

class AError extends BaseError('AError') {}

export const iterable = <T>(comparator: (a: T, b: T) => number) => (
  a: Iterable<T>,
  b: Iterable<T>,
): number => {
  const aIt = iter(a)
  const bIt = iter(b)

  try {
    while (true) {
      let aValue

      try {
        aValue = next(aIt)
      } catch (e) {
        ignore(e, StopIteration)
        throw new AError()
      }

      const bValue = next(bIt)

      const r = comparator(aValue, bValue)
      if (r !== 0) {
        return r
      }
    }
  } catch (e) {
    if (e instanceof AError) {
      try {
        next(bIt)
        return -1
      } catch (e) {
        ignore(e, StopIteration)
        return 0
      }
    }

    ignore(e, StopIteration)
    return 1
  }
}
