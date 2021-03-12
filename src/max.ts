import { all } from './all'
import { iter, next } from './iter'
import { sorted } from './sorted'
import { zip } from './zip'
import { map } from './map'
import { filter } from './filter'

export function isIterable(t: any): t is Iterable<unknown> {
  if (t == null) {
    return false
  }
  return t[Symbol.iterator] === 'function'
}

export function compare(a: unknown, b: unknown): number {
  if (typeof a === 'string' && typeof b === 'string') {
    return a.localeCompare(b)
  }
  // if (typeof a === 'number' && typeof b === 'number') {
  //   return a - b
  // }
  if (
    (typeof a === 'bigint' || typeof a === 'number') &&
    (typeof b === 'bigint' || typeof b === 'number')
  ) {
    return a < b ? -1 : a > b ? 1 : 0
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    const aIt = iter(a)
    const bIt = iter(b)

    let aV = next(aIt),
      bV = next(bIt)

    for (
      ;
      aV !== undefined && bV !== undefined;
      aV = next(aIt), bV = next(bIt)
    ) {
      if (compare(aV, bV) !== 0) {
        return compare(aV, bV)
      }
    }

    if (aV === undefined && bV === undefined) {
      return 0
    }
    if (aV === undefined) {
      return -1
    }
    return 1
  }

  return 0
}

export function max<T>(itble: Iterable<T>, key = (v: T) => v) {
  return next(sorted(itble, true, key))
}

export function min<T>(itble: Iterable<T>, key = (v: T) => v) {
  return next(sorted(itble, key))
}
