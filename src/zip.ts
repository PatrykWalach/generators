import { map } from './map'

export function zip<I extends Iterable<any>[]>(...itbles: I) {
  return map(...itbles, (...arr) => arr)
}
