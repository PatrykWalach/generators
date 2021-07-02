export const ignore = (e: Error, class_: Function) => {
  if (e instanceof class_) {
    return
  }
  throw e
}

export const BaseError = (name: string) =>
  class extends Error {
    constructor(message: unknown = '') {
      super(`${name}${message ? `: ${message}` : ''}`)
    }
  }

export class IndexError extends BaseError('IndexError') {}

export class StopIteration extends BaseError('StopIteration') {}

export class KeyError extends BaseError('KeyError') {}

export class ValueError extends BaseError('ValueError') {}

export function callable<A extends unknown[], R>(ctor: new (...args: A) => R) {
  return (...args: A): R => new ctor(...args)
}

interface Swap {
  <T>(arr: T[], a: number, b: number): void
}

export const swap: Swap = (arr, a, b) => {
  const previousB = arr[b]
  arr[b] = arr[a]
  arr[a] = previousB
}
