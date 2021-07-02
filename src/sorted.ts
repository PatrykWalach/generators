import { len } from './len'
import { swap } from './util'

export function partition<T>(
  arr: T[],
  lo: number,
  hi: number,
  cmp: (a: T, b: T) => number,
): number {
  const pivot = arr[hi]
  let i = lo
  for (let j = lo; j < hi; j++) {
    if (cmp(arr[j], pivot) < 0) {
      swap(arr, i, j)
      i++
    }
  }
  swap(arr, i, hi)
  return i
}

export function* quicksort<T>(
  arr: T[],
  lo: number,
  hi: number,
  cmp: (a: T, b: T) => number,
): Generator<T> {
  if (lo < hi) {
    const p = partition(arr, lo, hi, cmp)
    yield* quicksort(arr, lo, p - 1, cmp)
    yield arr[p]
    yield* quicksort(arr, p + 1, hi, cmp)
    return
  }
  if (lo === hi) {
    yield arr[lo]
  }
}

export function sorted<T>(
  it: Iterable<T>,
  {
    reverse = false,
    key = (v) => v,
  }: {
    reverse?: boolean
    key?: (v: T) => unknown
  } = {},
): Generator<T> {
  const arr = [...it]

  const cmp = reverse
    ? (a: T, b: T) => compare(key(b), key(a))
    : (a: T, b: T) => compare(key(a), key(b))

  return quicksort(arr, 0, len(arr) - 1, cmp)
}
