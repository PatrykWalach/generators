import { iter, next } from './iter'

import { sorted } from './sorted'
import { ignore, StopIteration, ValueError } from './util'

export function compare(a: unknown, b: unknown): number {
  if (typeof a === 'string' && typeof b === 'string') {
    return a.localeCompare(b)
  }

  if (
    (typeof a === 'bigint' || typeof a === 'number') &&
    (typeof b === 'bigint' || typeof b === 'number')
  ) {
    return a < b ? -1 : a > b ? 1 : 0
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    const aIt = iter(a)
    const bIt = iter(b)

    let aV, bV
    let aThrown = false

    while (true) {
      try {
        aV = next(aIt)
      } catch (e) {
        ignore(e, StopIteration)
        aThrown = true
      }

      try {
        bV = next(bIt)
      } catch (e) {
        ignore(e, StopIteration)
        if (aThrown) {
          return 0
        }
        return 1
      }

      if (aThrown) {
        return -1
      }

      if (compare(aV, bV) !== 0) {
        return compare(aV, bV)
      }
    }
  }

  return 0
}

/**
 *
 * @param it
 * @param options
 * @throws {ValueError} Argument arg is an empty sequence.
 */
export function max<T, K>(
  arg: Iterable<T>,
  options?: {
    key?: (v: T) => any
    default: K
  },
): T | K
export function max<T, K>(
  arg: Iterable<T>,
  options?: {
    key: (v: T) => any
  },
): T
export function max<T, K>(
  arg: Iterable<T>,
  {
    key = (v) => v,
    default: default_,
  }: {
    key?: (v: T) => any
    default?: K
  } = {},
) {
  try {
    return next(sorted(arg, true, key))
  } catch (e) {
    ignore(e, StopIteration)
    if (default_ === undefined) {
      throw new ValueError('max() arg is an empty sequence')
    }
  }
  return default_
}

/**
 *
 * @param it
 * @param options
 * @throws {ValueError} Argument arg is an empty sequence.
 */
export function min<T, K>(
  it: Iterable<T>,
  options?: {
    key?: (v: T) => any
    default: K
  },
): T | K
export function min<T, K>(
  it: Iterable<T>,
  options?: {
    key: (v: T) => any
  },
): T
export function min<T, K>(
  it: Iterable<T>,
  {
    key = (v) => v,
    default: default_,
  }: {
    key?: (v: T) => any
    default?: K
  } = {},
) {
  try {
    return next(sorted(it, key))
  } catch (e) {
    ignore(e, StopIteration)
    if (default_ === undefined) {
      throw new ValueError('min() arg is an empty sequence')
    }
  }
  return default_
}
