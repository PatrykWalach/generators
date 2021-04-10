export function sum<T>(iterable: Iterable<Iterable<T>>, start: T[]): T[]
export function sum(
  iterable: Iterable<number | boolean>,
  start?: number,
): number
export function sum(iterable: Iterable<bigint>, start: bigint): bigint
export function sum(iterable: Iterable<any>, start: string): string
export function sum(iterable: Iterable<string>, start?: number | bigint): string
export function sum<T>(
  iterable:
    | Iterable<number | boolean>
    | Iterable<bigint>
    | Iterable<any>
    | Iterable<string>
    | Iterable<Iterable<T>>,
  start: number | bigint | string | T[] = 0,
): number | string | bigint | T[] {
  let acc = start
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
