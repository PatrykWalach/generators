import { StopIteration } from './util'

interface Iter {
  <T>(it: Iterable<T>, sentinel?: T): Generator<T, void>
}

export const iter: Iter = function* (it, sentinel) {
  for (const v of it) {
    if (v === sentinel) {
      return
    }

    yield v
  }
}

interface Next {
  /**
   * @throws {StopIteration}
   */
  <T, R>(it: Iterator<T, R>): T
}

export const next: Next = (it) => {
  const n = it.next()
  if (n.done) {
    throw new StopIteration()
  }

  return n.value
}
