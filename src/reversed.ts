import { len } from './len'
import { range } from './range'
import { FiniteIterable, zip } from './zip'

class _reversed<T> implements FiniteIterable<T> {
  length: number;
  [key: number]: T

  constructor(seq: FiniteIterable<T>) {
    this.length = len(seq)

    for (const [i, j] of zip(range(this.length), range(len(seq) - 1, -1, -1))) {
      Object.defineProperty(this, i, {
        get() {
          return seq[j]
        },
      })
    }
  }

  *[Symbol.iterator]() {
    for (const i of range(this.length)) {
      yield this[i]
    }
  }
}

export function reversed<T>(
  seq: { [key: number]: T } & FiniteIterable<T>,
): FiniteIterable<T> {
  return new _reversed(seq)
}
