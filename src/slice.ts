import { ValueError } from './util'

export class Slice {
  start: number
  stop: number
  step: number

  constructor(start: number, stop: number, step: number) {
    this.start = start
    this.stop = stop
    this.step = step
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
    let { start, step, stop } = this

    if (start < 0) {
      start += len
      if (start < 0) {
        start = step < 0 ? -1 : 0
      }
    } else if (start >= len) {
      start = step < 0 ? len - 1 : len
    }

    if (stop < 0) {
      stop += len
      if (stop < 0) {
        stop = step < 0 ? -1 : 0
      }
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

export function slice(startOrStop: number, stop?: number, step: number = 1) {
  if (stop === undefined) {
    return new Slice(0, startOrStop, step)
  }
  return new Slice(startOrStop, stop, step)
}
