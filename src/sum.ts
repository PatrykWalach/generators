export function sum(iterable: Iterable<number>, start?: number): number
export function sum(iterable: Iterable<bigint>, start?: bigint): bigint
export function sum(
  iterable: Iterable<number> | Iterable<bigint>,
  start: number | bigint = 0,
): number | bigint {
  let acc = start
  for (const v of iterable) {
    acc += v as any
  }
  return acc
}
