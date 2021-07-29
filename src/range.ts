import { iter } from './iter'
import { slice, Slice, SliceString } from './slice'
import { callable, IndexError, ValueError } from './util'

import { __reversed__ } from './abs/Reversible'
import { Sequence } from './abs/Sequence'
import { len } from './len'

export class Range extends Sequence<number> {
  #length: number
  #start: number
  #stop: number
  #step: number

  get length(): number {
    return this.#length
  }

  private calculate(index: number): number {
    return this.#start + this.#step * index
  }

  /**
   * @throws {IndexError} Range index out of range.
   */
  get(slice: Slice | SliceString): Range
  get(index: number): number
  get(index: number | Slice | SliceString): Range | number {
    if (index instanceof Slice) {
      const [start, stop, step] = index.indices(len(this))
      return range(
        this.calculate(start),
        this.calculate(stop),
        this.#step * step,
      )
    }
    if (typeof index === 'string') {
      return this.get(Slice.from(index))
    }
    const v = this.calculate(index)

    if (
      (this.#step > 0 && v < this.#stop) ||
      (this.#step < 0 && v > this.#stop)
    ) {
      return v
    }

    throw new IndexError('range index out of range')
  }

  /**
   *
   * @param start
   * @param stop
   * @param step
   * @throws {ValueError} Argument step must not be zero.
   */
  constructor(start: number, stop?: number, step = 1) {
    super()
    if (step === 0) {
      throw new ValueError('range() arg 3 must not be zero')
    }

    this.#step = step

    if (stop === undefined) {
      stop = start
      start = 0
    }

    this.#length = Math.ceil((stop - start) / step)
    this.#start = start
    this.#stop = stop
  }

  [__reversed__](): Iterable<number> {
    // return slice({ step: -1 })(this.toArrayLike())
    return this.get('::-1')
  }
}

export const range = callable(Range)
