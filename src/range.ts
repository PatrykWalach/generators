import { __reversed__ } from './abs/Reversible'
import { Sequence } from './abs/Sequence'
import { IndexError, ValueError } from './util'
import { iter } from './iter'
import { len } from './len'
import { Slice, slice } from './slice'

export class Range extends Sequence<number> {
  length: number
  #start: number
  #stop: number
  #step: number

  /**
   * @throws {IndexError} Range index out of range.
   */
  get(slice: Slice): Range
  get(index: number): number
  get(indexOrSlice: number | Slice) {
    if (indexOrSlice instanceof Slice) {
      const [start, stop, step] = indexOrSlice.indices(len(this))
      return range(
        this.get(start),
        this.#start + this.#step * stop,
        step * this.#step,
      )
    }
    const v = this.#start + this.#step * indexOrSlice
    if (
      (this.#step > 0 && v < this.#stop) ||
      (this.#step < 0 && v > this.#stop)
    ) {
      return v
    }
    throw new IndexError('range index out of range')
  }

  constructor(start: number, stop: number, step: number) {
    super()
    this.length = Math.ceil((stop - start) / step)
    this.#start = start
    this.#stop = stop
    this.#step = step
  }

  [__reversed__]() {
    return iter(this.get(slice(-1, -Infinity, -1)))
  }
}

/**
 *
 * @param start
 * @param stop
 * @param step
 * @throws {ValueError} Argument step must not be zero.
 */
export function range(start: number, stop?: number, step: number = 1) {
  if (stop === undefined) {
    return new Range(0, start, step)
  }
  if (step === 0) {
    throw new ValueError('range() arg 3 must not be zero')
  }

  return new Range(start, stop, step)
}
