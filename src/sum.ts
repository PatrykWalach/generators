import { MutableSequence } from './abs/MutableSequence'

const isExtendable = <T>(
  acc: unknown | MutableSequence<T>,
): acc is MutableSequence<T> => (acc as MutableSequence<T>).extend !== undefined

export function sum<T, K extends MutableSequence<T>>(
  iterable: Iterable<Iterable<T>>,
  start: K,
): K
export function sum<T>(iterable: Iterable<Iterable<T>>, start: T[]): T[]
export function sum(
  iterable: Iterable<number | boolean>,
  start?: number,
): number
export function sum(iterable: Iterable<bigint>, start: bigint): bigint
export function sum(iterable: Iterable<any>, start: string): string
export function sum(iterable: Iterable<string>, start?: number | bigint): string
export function sum<T, K extends MutableSequence<T>>(
  iterable:
    | Iterable<number | boolean>
    | Iterable<bigint>
    | Iterable<any>
    | Iterable<string>
    | MutableSequence<T>
    | Iterable<Iterable<T>>,
  start: number | bigint | string | K | T[] = 0,
): number | string | bigint | K | T[] {
  let acc = start
  if (isExtendable(acc)) {
    for (const v of iterable) {
      acc.extend(v)
    }
    return acc
  }
  if (Array.isArray(acc)) {
    for (const v of iterable) {
      acc.push(...v)
    }
    return acc
  }
  for (const v of iterable) {
    acc += v
  }
  return acc
}
