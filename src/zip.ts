import { map } from './map'

export function zip<I extends Iterable<any>[]>(...itbles: I) {
  return map((...arr) => arr, ...itbles)
}

export interface FiniteIterable<T> extends Iterable<T> {
  length: number
}

export class FiniteGenerator<T = unknown, TReturn = any, TNext = unknown>
  implements Generator<T, TReturn, TNext> {
  length: number
  g: Generator<T, TReturn, TNext>

  static from<T, TReturn, TNext, A extends any[]>(
    generator: (...args: A) => Generator<T, TReturn, TNext>,
  ) {
    return (length: number, ...args: A) =>
      new FiniteGenerator(generator(...args), length)
  }

  constructor(g: Generator<T, TReturn, TNext>, length: number) {
    this.g = g
    this.length = length
  }
  next(...args: [] | [TNext]) {
    return this.g.next(...args)
  }
  return(value: TReturn) {
    return this.g.return(value)
  }
  throw(e: any) {
    return this.g.throw(e)
  }
  [Symbol.iterator]() {
    return this.g[Symbol.iterator]()
  }
}
