import { IterableValue, map } from './map'
import { pipe } from './pipe'

type ZipResult<I extends unknown[]> = Iterable<
  { [K in keyof I]: IterableValue<I[K]> }
>

interface Zip {
  <T extends [Iterable<unknown>, ...Iterable<unknown>[]]>(
    ...iterables: T
  ): ZipResult<T>
}

// export const zip: Zip = (...iterables) => map(...iterables, (...args) => args)

export const zip: Zip = map((...args) => args)
