import { iter, next } from '../iter'

export function reduce<T>(
  iterable: Iterable<T>,
  reducer: (acc: T, v: T) => T,
): T
export function reduce<T, A>(
  iterable: Iterable<T>,
  reducer: (acc: A, v: T) => A,
  initialValue?: A,
): A
export function reduce<T, A>(
  iterable: Iterable<T>,
  reducer: (acc: A | T, v: T) => A | T,
  initialValue?: A,
): A | T {
  const it = iter(iterable)
  let acc = initialValue === undefined ? next(it) : initialValue
  for (const v of it) {
    acc = reducer(acc, v)
  }
  return acc
}
