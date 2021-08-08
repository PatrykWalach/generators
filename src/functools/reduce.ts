import { curry } from '../curry'
import { iter, next } from '../iter'

type Reducer<A, T> = (acc: A, v: T) => A

export const reduce_ = <T, A>(
  iterable: Iterable<T>,
  reducer: Reducer<A | T, T>,
  initialValue?: A,
) => {
  const it = iter(iterable)
  let acc = initialValue === undefined ? next(it) : initialValue
  for (const v of it) {
    acc = reducer(acc, v)
  }
  return acc
}
interface Reduce {
  <T>(iterable: Iterable<T>, reducer: (acc: T, v: T) => T): T
  <T, A>(
    iterable: Iterable<T>,
    reducer: (acc: A, v: T) => A,
    initialValue?: A,
  ): A

  <T>(reducer: (acc: T, v: T) => T): (iterable: Iterable<T>) => T
  <T, A>(reducer: (acc: A, v: T) => A, initialValue?: A): (
    iterable: Iterable<T>,
  ) => A
}

export const reduce = curry(reduce_) as Reduce
