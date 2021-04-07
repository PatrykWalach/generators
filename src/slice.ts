import { Sequence } from './abs/Sequence'
import { len } from './len'
import { range } from './range'
import { zip } from './zip'

class _slice<T> extends Sequence<T> {
  length: number;
  [key: number]: T

  constructor(itble: Sequence<T>, start: number, stop: number, step: number) {
    super()
    this.length = len(range(start, stop, step))

    for (const [i, j] of zip(range(this.length), range(start, stop, step))) {
      Object.defineProperty(this, i, {
        get() {
          return itble[j]
        },
      })
    }
  }
}

export function slice<T>(
  itble: Sequence<T>,
  startOrStop: number,
  stop?: number,
  step: number = 1,
): Sequence<T> {
  const [_start, _stop] = (stop === undefined
    ? [0, startOrStop]
    : [startOrStop, stop]
  )
    .map((v) => negative(v, itble.length))
    .map((v) => minmax(v, itble.length))

  return new _slice(itble, _start, _stop, step)
}

function minmax(v: number, max: number) {
  return Math.max(0, Math.min(v, max))
}

function negative(v: number, l: number) {
  return v < 0 ? l + v : v
}
