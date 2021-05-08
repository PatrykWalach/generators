import { callable, ValueError } from './util'

export class Slice {
  start: number
  stop: number
  step: number

  constructor(
    start?: null | number,
    stop?: null | number,
    step?: null | number,
  ) {
    if (step === 0) {
      throw new ValueError('slice step cannot be zero')
    }

    if (stop === undefined && step === undefined) {
      stop = start
      start = null
    }

    if (step === undefined || step === null) {
      step = 1
    }

    if (start === undefined || start === null) {
      start = step < 0 ? Infinity : 0
    }

    if (stop === undefined || stop === null) {
      stop = step < 0 ? -Infinity : Infinity
    }

    this.step = step
    this.stop = stop
    this.start = start
  }

  /**
   *
   * @param len
   * @throws {ValueError} Argument len should not be negative.
   */
  indices(len: number): [start: number, stop: number, stride: number] {
    if (len < 0) {
      throw new ValueError('length should not be negative')
    }

    let { start, stop } = this
    const { step } = this

    if (start < 0) {
      const normalizedStart = step < 0 ? -1 : 0
      start = Math.max(start + len, normalizedStart)
    } else if (start >= len) {
      start = step < 0 ? len - 1 : len
    }

    if (stop < 0) {
      const normalizedStop = step < 0 ? -1 : 0
      stop = Math.max(stop + len, normalizedStop)
    } else if (stop >= len) {
      stop = step < 0 ? len - 1 : len
    }

    // if (step < 0) {
    //   if (stop < start) {
    // return (start - stop - 1) / -step + 1
    // }
    // } else {
    //   if (start < stop) {
    // return (stop - start - 1) / step + 1
    //   }
    // }

    return [start, stop, step]
  }
}

export const slice = callable(Slice)
