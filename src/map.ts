 
import { iter, next } from './iter'
import { ignore, StopIteration } from './util'

export type M<T> = T extends Iterable<infer K> ? K : unknown

export type F<T extends any[], R> = (
  ...vs: {
    [K in keyof T]: M<T[K]>
  }
) => R

export function* map<T extends Iterable<unknown>[], R>(
  ...itbles: [...T, F<T, R>]
): Iterable<R> {
  const fn = itbles.pop() as F<T, R>

  const its = ((itbles as unknown) as T).map((itble) => iter(itble))

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
