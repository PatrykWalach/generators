import { len } from './len'
import { range } from './range'
import { FiniteGenerator, FiniteIterable } from './zip'

export function reversed<T>(
  seq: { [key: number]: T } & FiniteIterable<T>,
): FiniteGenerator<T, void> {
  return new FiniteGenerator(
    (function* () {
      for (const i of range(len(seq) - 1, -1, -1)) {
        yield seq[i]
      }
    })(),
    len(seq),
  )
}
