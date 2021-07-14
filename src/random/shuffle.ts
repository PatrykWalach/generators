import { Sequence } from '../abs/Sequence'
import { len } from '../len'
import { range } from '../range'
import { reversed } from '../reversed'

import { ignore, IndexError, ValueError } from '../util'

declare function randbelow(n: number, options?: { maxSize?: number }): number

export const uniform = (a: number, b: number) => a + (b - a) * Math.random()

/**
 * @throws {ValueError} Non-integer arg 1 for randrange().
 * @throws {ValueError} Empty range for randrange().
 * @throws {ValueError} Non-integer stop for randrange().
 * @throws {ValueError} Empty range for randrange() (start, stop, width).
 * @throws {ValueError} Non-integer step for randrange().
 * @throws {ValueError} Zero step for randrange().
 */
export const randrange = (
  start: number,
  stop: number | null = null,
  step = 1,
) => {
  if (!isFinite(start)) {
    throw new ValueError('non-integer arg 1 for randrange()')
  }
  if (stop === null) {
    if (start > 0) {
      return randbelow(start)
    }
    throw new ValueError('empty range for randrange()')
  }
  if (!isFinite(stop)) {
    throw new ValueError('non-integer stop for randrange()')
  }
  const width = stop - start
  if (step == 1 && width > 0) {
    return start + randbelow(width)
  }
  if (step == 1) {
    throw new ValueError(
      `empty range for randrange() (${start}, ${stop}, ${width})`,
    )
  }
  if (!isFinite(step)) {
    throw new ValueError('non-integer step for randrange()')
  }
  const n = (() => {
    if (step > 0) {
      return Math.floor((width + step - 1) / step)
    } else if (step < 0) {
      return Math.floor((width + step + 1) / step)
    }
    throw new ValueError('zero step for randrange()')
  })()

  if (n <= 0) {
    throw new ValueError('empty range for randrange()')
  }

  return start + step * randbelow(n)
}

export const randint = (a: number, b: number) => randrange(a, b + 1)

/**
 * @throws {IndexError} Cannot choose from an empty sequence.
 */
export const choice = <T>(seq: Sequence<T>) => {
  try {
    const i = randbelow(len(seq))
    return seq.get(i)
  } catch (e) {
    ignore(e, ValueError)
    throw new IndexError('Cannot choose from an empty sequence')
  }
}

export function* shuffle<T>([...arr]: Iterable<T>) {
  for (const i of reversed(range(len(arr)))) {
    const j = Math.floor(Math.random() * (i + 1))
    const [v] = arr.splice(j, 1, arr[i])
    yield v
    arr.pop()
  }
}

/**
 * @throws {ValueError} Sample larger than population or is negative.
 */
export const sample = <T>(population: Sequence<T>, k: number) => {
  const n = len(population)
  if (!(0 <= k && k <= n)) {
    throw new ValueError('Sample larger than population or is negative')
  }
  const result = Array.from({ length: k }, (): T | null => null)

  let setSize = 21
  if (k > 5) {
    setSize += 4 ** Math.ceil(Math.log(k * 3) / Math.log(4))
  }
  if (n <= setSize) {
    const pool = [...population]
    for (const i of range(k)) {
      const j = randbelow(n - i)
      ;[result[i], pool[j]] = [pool[j], pool[n - i - 1]]
      // result[i] = pool[j]
      // pool[j] = pool[n - i - 1]
    }
  } else {
    const selected = new globalThis.Set()
    for (const i of range(k)) {
      let j = randbelow(n)
      while (selected.has(j)) {
        j = randbelow(n)
      }
      selected.add(j)
      result[i] = population.get(j)
    }
  }
  return result
}
