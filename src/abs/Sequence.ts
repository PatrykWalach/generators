import { filter } from '../filter'
import { len } from '../len'
import { map } from '../map'
import { range } from '../range'
import { reversed } from '../reversed'
import { sum } from '../sum'
import { Collection } from './Collection'
import { Reversible, __reversed__ } from './Reversible'

export abstract class Sequence<T> implements Reversible<T>, Collection<T> {
  [index: number]: T

  abstract length: number

  *[Symbol.iterator]() {
    for (let i = 0; i < len(this); i++) {
      const v = this[i]
      yield v
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
      yield this[i]
    }
  }

  indexOf(value: T, start = 0) {
    if (start < 0) {
      start = Math.max(len(this) + start, 0)
    }

    for (let i = start; i < len(this); i++) {
      const v = this[i]
      if (v === value) {
        return i
      }
    }
    return -1
  }

  count(value: T) {
    return sum(
      map(
        filter(this, (v) => v === value),
        (v) => 1,
      ),
    )
  }
}
