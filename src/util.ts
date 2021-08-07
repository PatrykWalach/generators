export const ignore = (e: Error, ...classes: (new () => void)[]): void => {
  if (classes.some((class_) => e instanceof class_)) return

  throw e
}

export const BaseError = (name: string): new (message?: unknown) => Error =>
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
  ;[arr[a], arr[b]] = [arr[b], arr[a]]
}
