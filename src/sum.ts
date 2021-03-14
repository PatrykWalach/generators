export function sum(
  iterable: Iterable<number | boolean>,
  start?: number,
): number
export function sum(iterable: Iterable<bigint>, start: bigint): bigint
export function sum(iterable: Iterable<any>, start: string): string
export function sum(iterable: Iterable<string>, start?: number | bigint): string
export function sum(
  iterable:
    | Iterable<number | boolean>
    | Iterable<bigint>
    | Iterable<any>
    | Iterable<string>,
  start: number | bigint | string = 0,
): number | string | bigint {
  let acc = start
  for (const v of iterable) {
    acc += v
  }
  return acc
}
