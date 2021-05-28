import { map } from './map'

export const all = (it: Iterable<unknown>): boolean => {
  for (const v of it) {
    if (v) {
      continue
    }

    return false
  }

  return true
}

export function any(it: Iterable<unknown>): boolean {
  return !all(map(it, (v) => !v))
}
