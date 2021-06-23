import * as Comparator from './comparators'
import { reduce } from './functools/reduce'
import { pipe } from './pipe'
import { ignore, StopIteration, ValueError } from './util'

/**
 * @throws {ValueError} Argument arg is an empty sequence.
 */
export function max<T, K>(
  it: Iterable<T>,
  options?: {
    key?: (v: T) => void
    default: K
  },
): T | K
export function max<T>(
  it: Iterable<T>,
  options?: {
    key: (v: T) => void
  },
): T
export function max<T, K>(
  it: Iterable<T>,
  options: {
    key?: (v: T) => void
    default?: K
  } = {},
): T | K {
  const { key = (v) => v, default: default_ } = options
  try {
    return pipe(
      it,
      reduce((a, b) => (Comparator.universal(key(a), key(b)) > 0 ? a : b)),
    )
  } catch (e) {
    ignore(e, StopIteration)
    if (default_ === undefined) {
      throw new ValueError('max() arg is an empty sequence')
    }
  }
  return default_
}

/**
 * @throws {ValueError} Argument arg is an empty sequence.
 */
export function min<T, K>(
  it: Iterable<T>,
  options?: {
    key?: (v: T) => void
    default: K
  },
): T | K
export function min<T>(
  it: Iterable<T>,
  options?: {
    key: (v: T) => void
  },
): T

export function min<T, K>(
  it: Iterable<T>,
  options: {
    key?: (v: T) => void
    default?: K
  } = {},
): T | K {
  const { key = (v) => v, default: default_ } = options
  try {
    return pipe(
      it,
      reduce((a, b) => (Comparator.universal(key(a), key(b)) < 0 ? a : b)),
    )
  } catch (e) {
    ignore(e, StopIteration)
    if (default_ === undefined) {
      throw new ValueError('min() arg is an empty sequence')
    }
  }
  return default_
}
