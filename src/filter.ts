import { curry } from './curry'

export const _filter = function* <T, R extends T>(
  it: Iterable<T>,
  condition: ((v: T) => v is R) | ((v: T) => boolean),
): Iterable<T> | Iterable<R> {
  for (const v of it) {
    if (!condition(v)) {
      continue
    }

    yield v
  }
}

interface Filter {
  <T, R extends T>(condition: (v: T) => v is R): (
    it: Iterable<T>,
  ) => Iterable<R>
  <T>(condition: (v: T) => boolean): (it: Iterable<T>) => Iterable<T>

  <T, R extends T>(it: Iterable<T>, condition: (v: T) => v is R): Iterable<R>
  <T>(it: Iterable<T>, condition: (v: T) => boolean): Iterable<T>
}

export const filter = curry(_filter) as Filter
