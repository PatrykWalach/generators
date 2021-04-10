import { Reversible, __reversed__ } from './abs/Reversible'
import { Sized } from './abs/Sized'
import { len } from './len'
import { range } from './range'


const isReversible = <T>(
  seq: Reversible<T> | (Sized & { [index: number]: T }),
): seq is Reversible<T> => (seq as Reversible<T>)[__reversed__] !== undefined

export function* reversed<T>(
  seq: Reversible<T> | (Sized & { [index: number]: T }),
): Iterable<T> {
  if (isReversible(seq)) {
    yield* seq[__reversed__]()
    return
  }
  
  for (const i of reversed(range(len(seq)))) {
    yield seq[i]
  }
}
