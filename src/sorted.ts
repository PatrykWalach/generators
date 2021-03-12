import { filter } from './filter'
import { len } from './len'
import { compare } from './max'
import { range } from './range'

export function* _sorted<T>(
  it: Iterable<T>,
  key: (v: T) => any,
  reverse = false,
) {
  const arr = [...it]

  const cmp = reverse
    ? (a: unknown, b: unknown) => compare(b, a)
    : (a: unknown, b: unknown) => compare(a, b)

  for (const i of range(0, len(arr))) {
    for (const j of filter(
      range(i + 1, len(arr)),
      (j) => cmp(key(arr[j]), key(arr[i])) < 0,
    )) {
      const temp = arr[j]
      arr[j] = arr[i]
      arr[i] = temp
    }
    // for (const j of range(i + 1, len(arr))) {
    //   if (cmp(key(arr[j]), key(arr[i])) < 0) {
    //     const temp = arr[j]
    //     arr[j] = arr[i]
    //     arr[i] = temp
    //   }
    // }

    yield arr[i]
  }
}

export function sorted<T>(
  it: Iterable<T>,
  keyOrReverse?: boolean | ((v: T) => any),
): Generator<T, void>
export function sorted<T>(
  it: Iterable<T>,
  reverse?: boolean,
  key?: (v: T) => any,
): Generator<T, void>
export function sorted<T>(
  it: Iterable<T>,
  keyOrReverse?: boolean | ((v: T) => any),
  key?: (v: T) => any,
): Generator<T, void> {
  if (typeof keyOrReverse === 'function') {
    return _sorted(it, keyOrReverse, false)
  }
  if (keyOrReverse === undefined) {
    return _sorted(it, (v) => v, false)
  }
  if (typeof key === 'function') {
    return _sorted(it, key, keyOrReverse)
  }
  return _sorted(it, (v) => v, keyOrReverse)
}
