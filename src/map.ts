import { iter, next } from './iter'
import { ignore, StopIteration } from './util'

export type M<T> = T extends Iterable<infer K> ? K : unknown

export type F<T extends unknown[], R> = (
  ...vs: {
    [K in keyof T]: M<T[K]>
  }
) => R

export function* map<T extends Iterable<unknown>[], R>(
  ...iterables: [...T, F<T, R>]
): Generator<R> {
  const fn = iterables.pop() as F<T, R>

  const its = ((iterables as unknown) as T).map((iterable) => iter(iterable))

  try {
    let values = its.map(next)
    while (true) {
      yield fn(
        ...(values as {
          [K in keyof T]: M<T[K]>
        }),
      )
      values = its.map(next)
    }
  } catch (e) {
    ignore(e, StopIteration)
  }
}
