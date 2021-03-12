import { filter } from './filter'
import { iter } from './iter'
import { len } from './len'
import { map } from './map'
import { range } from './range'
import { FiniteGenerator, FiniteIterable, zip } from './zip'

const _slice = FiniteGenerator.from(function* <T>(
  itble: { [key: number]: T } & FiniteIterable<T>,
  start: number,
  stop: number,
  step: number,
): Generator<T, void> {
  for (const i of range(start, stop, step)) {
    yield itble[i]
  }
})

export function slice<T>(
  itble: { [key: number]: T } & FiniteIterable<T>,
  startOrStop: number,
  stop?: number,
  step: number = 1,
): FiniteGenerator<T, void> {
  const [_start, _stop] = (stop === undefined
    ? [0, startOrStop]
    : [startOrStop, stop]
  )
    .map((v) => negative(v, itble.length))
    .map((v) => minmax(v, itble.length))

  return _slice(_stop - _start, itble, _start, _stop, step)
}

function minmax(v: number, max: number) {
  return Math.max(0, Math.min(v, max))
}

function negative(v: number, l: number) {
  return v < 0 ? l + v : v
}
