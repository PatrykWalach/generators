import { curry } from './curry'
import { iter, next } from './iter'
import { ignore, StopIteration, ValueError } from './util'

export type IterableValue<T> = T extends Iterable<infer K> ? K : unknown

export type IterableValues<T> = {
  [K in keyof T]: IterableValue<T[K]>
}

export type F<T extends unknown[], R> = (...vs: IterableValues<T>) => R

const isIterable = (o: unknown): o is Iterable<unknown> =>
  typeof (o as Iterable<unknown>)[Symbol.iterator] === 'function'

function* _map(
  _fn: Iterable<unknown>,
  _it: Iterable<unknown> | ((...args: unknown[]) => unknown),
  ..._iterables: (Iterable<unknown> | ((...args: unknown[]) => unknown))[]
) {
  _iterables.unshift(_fn, _it)

  _iterables.unshift(..._iterables.splice(_iterables.length - 1, 1))

  const [fn, ...iterables] = _iterables as unknown as [
    (...args: unknown[]) => unknown,
    ...Iterable<unknown>[]
  ]

  if (typeof fn !== 'function') {
    throw new ValueError(`fn is not a function`)
  }

  for (const it of iterables) {
    if (!isIterable(it)) {
      throw new ValueError(`${it} is not iterable`)
    }
  }

  const its = iterables.map((iterable) => iter(iterable))

  try {
    do {
      const values = its.map(next)
      yield fn(...values)
    } while (true)
  } catch (e) {
    ignore(e, StopIteration)
  }
}

interface Map {
  <T extends Iterable<unknown>[], R>(_fn: F<T, R>): (...its: T) => Iterable<R>

  <T extends Iterable<unknown>[], R>(
    ..._iterables: [...T, F<T, R>]
  ): Iterable<R>
}

export const map = curry(_map) as unknown as Map
