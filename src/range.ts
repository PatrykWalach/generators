import { FiniteIterable } from './zip'

class _range implements FiniteIterable<number> {
  length: number = 0;
  [key: number]: number

  constructor(start: number, stop: number, step: number) {
    this.length = Math.ceil((stop - start) / step)

    for (let i = 0; i < this.length; i++) {
      Object.defineProperty(this, i, {
        get() {
          return start + step * i
        },
      })
    }
  }

  *[Symbol.iterator](this: { [key: number]: number; length: number }) {
    for (let i = 0; i < this.length; i++) {
      yield this[i]
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
): FiniteIterable<number> & { [key: number]: number } {
  if (stop === undefined) {
    return new _range(0, startOrStop, step)
  }
  if (step === 0) {
    throw new ValueError('Infinite Range')
  }
  return new _range(startOrStop, stop, step)
}
