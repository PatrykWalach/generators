import { map } from '..'

export function starmap<T extends unknown[], R>(
  it: Iterable<T>,
  fn: (...vs: T) => R,
): Iterable<R> {
  return map(it, (vs) => fn(...vs))
}
