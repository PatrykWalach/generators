import { F } from 'ts-toolbelt'

export function filter<T, R extends T>(
  it: Iterable<T>,
  condition: (v: T) => v is R,
): Generator<R, void>
export function filter<T>(
  it: Iterable<T>,
  condition: (v: T) => boolean,
): Generator<T, void>
export function* filter<T, R extends T>(
  it: Iterable<T>,
  condition: ((v: T) => v is R) | ((v: T) => boolean),
) {
  for (const v of it) {
    if (!condition(v)) {
      continue
    }
    yield v
  }
}
