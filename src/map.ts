import { iter, next } from './iter'

export type M<T> = T extends Iterable<infer K> ? K : unknown

export function* map<T extends Iterable<unknown>[], R>(
  fn: (
    ...vs: {
      [K in keyof T]: M<T[K]>
    }
  ) => R,
  ...itbles: T
) {
  const its = itbles.map((itble) => iter(itble))
  let values = its.map(next)

  while (values.every((v) => v !== undefined)) {
    yield fn(
      ...(values as {
        [K in keyof T]: M<T[K]>
      }),
    )
    values = its.map(next)
  }
}
