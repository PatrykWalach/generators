import { map } from './map'
import { pipe } from './pipe'

interface All {
  (it: Iterable<unknown>): boolean
}

export const all: All = (it) => {
  for (const v of it) {
    if (v) {
      continue
    }

    return false
  }

  return true
}

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
