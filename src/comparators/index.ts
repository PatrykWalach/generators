import { I, O } from 'ts-toolbelt'
import { iter, next } from '../iter'
import { BaseError, ignore, StopIteration } from '../util'

export const string = (a: string, b: string) => a.localeCompare(b)

export const number = (a: number | bigint, b: number | bigint) =>
  a < b ? -1 : a > b ? 1 : 0

export const reversed =
  <T>(comparator: (a: T, b: T) => number) =>
  (a: T, b: T) =>
    comparator(a, b) * -1

class AError extends BaseError('AError') {}

export const object =
  <T>(comparator: (a: T, b: T) => number) =>
  (
    a: Record<string | number | symbol, T>,
    b: Record<string | number | symbol, T>,
  ) =>
    iterable(comparator)(Object.values(a), Object.values(b))

export const iterable =
  <T>(comparator: (a: T, b: T) => number) =>
  (a: Iterable<T>, b: Iterable<T>): number => {
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

const isObject = (x: unknown): x is Record<string | symbol | number, unknown> =>
  typeof x === 'object' && x !== null

export function universal(a: unknown, b: unknown): number {
  if (typeof a === 'string' && typeof b === 'string') {
    return string(a, b) //a.localeCompare(b)
  }

  if (
    (typeof a === 'bigint' || typeof a === 'number') &&
    (typeof b === 'bigint' || typeof b === 'number')
  ) {
    return number(a, b) //a < b ? -1 : a > b ? 1 : 0
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    return iterable(universal)(a, b) //universalArrays(a, b)
  }

  if (isObject(a) && isObject(b)) {
    return object(universal)(a, b)
  }

  return 0
}
