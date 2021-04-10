import { filter } from '../filter'
import { ignore, IndexError, ValueError } from '../util'
import { len } from '../len'
import { map } from '../map'
import { range } from '../range'
import { reversed } from '../reversed'
import { sum } from '../sum'
import { Collection } from './Collection'

import { Reversible, __reversed__ } from './Reversible'

export abstract class Sequence<T> implements Reversible<T>, Collection<T> {
  /**
   * @throws {IndexError}
   */
  abstract get(index: number): T
  abstract readonly length: number

  *[Symbol.iterator]() {
    try {
      for (let i = 0; true; i++) {
        const v = this.get(i)
        yield v
      }
    } catch (e) {
      ignore(e, IndexError)
    }
  }

  includes(value: T) {
    for (const v of this) {
      if (v === value) {
        return true
      }
    }
    return false
  }

  *[__reversed__](): Iterable<T> {
    for (const i of reversed(range(len(this)))) {
      yield this.get(i)
    }
  }

  /**
   * @throws {ValueError} Argument value is not in list.
   */
  index(value: T, start = 0, stop: number | null = null) {
    if (start !== null && start < 0) {
      start = Math.max(len(this) + start, 0)
    }

    if (stop !== null && stop < 0) {
      stop += len(this)
    }

    for (let i = start; stop === null || i < stop; i++) {
      try {
        const v = this.get(i)
        if (v === value) {
          return i
        }
      } catch (e) {
        ignore(e, IndexError)
      }
    }

    throw new ValueError(`${value} is not in list`)
  }

  count(value: T) {
    return sum(
      map(
        filter(this, (v) => v === value),
        () => 1,
      ),
    )
  }
}
