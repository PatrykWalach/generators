import { M, map } from './map'
import { sorted } from './sorted'

type A<T> = {
  [K in keyof T]: M<T[K]>
}

export class GeneratorsIterable<T> implements Iterable<T> {
  it: Iterable<T>

  constructor(it: Iterable<T>) {
    this.it = it
  }

  do<A extends any[], R>(
    fn: (arg: Iterable<T>, ...args: A) => Iterable<R>,
    ...args: A
  ): GeneratorsIterable<R> {
    return new GeneratorsIterable(fn.call(null, this, ...args))
  }

  [Symbol.iterator]() {
    return this.it[Symbol.iterator]()
  }
}

console.log(
  new GeneratorsIterable([1, 2, 3])
    .do(map, (a) => a ** 4)
    // .do(filter, (a) => a < 2)
    .do(sorted, true),
)
