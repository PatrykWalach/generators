import { FiniteGenerator } from './zip'

const _range = FiniteGenerator.from(function* (
  start: number,
  stop: number,
  step: number,
) {
  if (step < 0) {
    for (let i = start; i > stop; i += step) {
      yield i
    }
    return
  }

  for (let i = start; i < stop; i += step) {
    yield i
  }
})
export class ValueError extends Error {
  constructor(message: string) {
    super(`ValueError: ${message}`)
  }
}
export function range(
  startOrStop: number,
  stop?: number,
  step: number = 1,
): FiniteGenerator<number> {
  if (stop === undefined) {
    return _range(startOrStop, 0, startOrStop, step)
  }
  if (step === 0) {
    throw new ValueError('Infinite Range')
  }
  return _range(stop - startOrStop, startOrStop, stop, step)
}
