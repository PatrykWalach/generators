import { __reversed__ } from './abs/Reversible'
import { Sequence } from './abs/Sequence'
 

class Range extends Sequence<number> {
  length: number

  constructor(start: number, stop: number, step: number) {
    super()
    this.length = Math.ceil((stop - start) / step)

    for (let i = 0; i < this.length; i++) {
      Object.defineProperty(this, i, {
        get() {
          return start + step * i
        },
      })
    }
  }
}

export class ValueError extends Error {
  constructor(message: string) {
    super(`ValueError: ${message}`)
  }
}

export function range(
  startOrStop: number,
  stop?: number,
  step: number = 1,
): Sequence<number> {
  if (stop === undefined) {
    return new Range(0, startOrStop, step)
  }
  if (step === 0) {
    throw new ValueError('Infinite Range')
  }

  return new Range(startOrStop, stop, step)
}
