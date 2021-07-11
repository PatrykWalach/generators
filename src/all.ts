import { curry } from './curry'
import { map } from './map'
import { pipe } from './pipe'

interface All {
  (it: Iterable<unknown>): boolean

  (): (it: Iterable<unknown>) => boolean
}

export const all_ = (it: Iterable<unknown>) => {
  for (const v of it) {
    if (v) {
      continue
    }

    return false
  }

  return true
}

export const all = curry(all_) as All
interface Any {
  (it: Iterable<unknown>): boolean

}

export const any: Any = (it) => {
  return !pipe(
    it,
    map((v) => !v),
    all,
  )
}
