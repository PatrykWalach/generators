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

export class KeyError extends BaseError('KeyError ') {}
