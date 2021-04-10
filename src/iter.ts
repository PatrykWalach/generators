import { StopIteration } from "./util"

 

export function* iter<T>(it: Iterable<T>, sentinel?: T): Generator<T, void> {
  for (const v of it) {
    if (v === sentinel) {
      return
    }
    yield v
  }
}

/**
 * @throws {StopIteration}
 */
export function next<T, R>(it: Iterator<T, R>) {
  const n = it.next()
  if (n.done) {
    throw new StopIteration()
  }
  return n.value
}
