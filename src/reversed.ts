import { __reversed__ } from './abs/Reversible'

import { Sized } from './abs/Sized'
import { len } from './len'
import { range } from './range'

export function* reversed<T>(seq: Sized & { [index: number]: T }): Iterable<T> {
  for (const i of range(len(seq) - 1, -1, -1)) {
    yield seq[i]
  }
}
