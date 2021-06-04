import { Reversible, __reversed__ } from './abs/Reversible'
import { Sized } from './abs/Sized'
import { len } from './len'
import { pipe } from './pipe'
import { range } from './range'

const isReversible = <T>(
  seq: Reversible<T> | (Sized & { [index: number]: T }),
): seq is Reversible<T> => (seq as Reversible<T>)[__reversed__] !== undefined

export function* reversed<T>(
  it: Reversible<T> | (Sized & { [index: number]: T }),
): Iterable<T> {
  if (isReversible(it)) {
    yield* it[__reversed__]()
    return
  }

  for (const i of pipe(it, len, range, reversed)) {
    yield it[i]
  }
}
