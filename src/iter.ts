export function* iter<T>(it: Iterable<T>, sentinel?: T): Generator<T, void> {
  for (const v of it) {
    if (v === sentinel) {
      return
    }
    yield v
  }
}

export function next<T, R>(it: Iterator<T, R>) {
  return it.next().value
}
