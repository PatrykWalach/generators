export function all(it: Iterable<any>): boolean {
  for (const v of it) {
    if (v) {
      continue
    }
    return false
  }

  return true
}

export function any(it: Iterable<any>) {
  for (const v of it) {
    if (!v) {
      continue
    }
    return true
  }
  return false
}
