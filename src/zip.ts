import { map } from './map'

export function zip<I extends Iterable<any>[]>(...itbles: I) {
  return map(...itbles, (...arr) => arr)
}

export type FiniteIterable<T> = Iterable<T> & {
  length: number
  [key: number]: T
}
