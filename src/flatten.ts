import { curry } from './curry'

type Flattened<T> = T extends Iterable<infer U> ? Flattened<U> : T

const isIterable = (o: unknown): o is Iterable<unknown> =>
  typeof o === 'object' &&
  o !== null &&
  typeof (o as Iterable<unknown>)[Symbol.iterator] === 'function'

export const _flatten = function* <T>(
  iterable: Iterable<T> | unknown,
  depth: number | undefined,
): Iterable<Flattened<T>> {
  if (depth === undefined) {
    depth = Infinity
  }

  if (depth < 0 || !isIterable(iterable)) {
    yield iterable as Flattened<T>
    return
  }

  for (const value of iterable) {
    yield* flatten(value, depth - 1)
  }
}

interface Flatten {
  <T>(depth?: number): (
    iterable: Iterable<T> | unknown,
  ) => Iterable<Flattened<T>>

  <T>(iterable: Iterable<T> | unknown, depth: number): Iterable<Flattened<T>>
}

export const flatten = curry(_flatten) as Flatten
