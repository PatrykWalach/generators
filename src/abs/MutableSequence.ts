import { IndexError, ignore } from '../util'
import { len } from '../len'
import { range } from '../range'
import { Sequence } from './Sequence'

export const __set__ = Symbol('__set__')
export const __delete__ = Symbol('__delete__')
export abstract class MutableSequence<T> extends Sequence<T> {
  abstract set(index: number, value: T): void
  abstract delete(index: number): void
  abstract insert(index: number, value: T): void

  append(value: T): void {
    this.insert(len(this), value)
  }

  remove(value: T) {
    this.delete(this.index(value))
  }

  pop(index = -1) {
    const v = this.get(index)
    this.delete(index)
    return v
  }

  clear() {
    try {
      while (true) {
        this.pop()
      }
    } catch (e) {
      ignore(e, IndexError)
    }
  }

  extend(values: Iterable<T>) {
    if (values === this) {
      //TODO: replace  [...values] with list(values) after implementing list
      values = [...values]
    }
    for (const v of values) {
      this.append(v)
    }
  }

  reverse() {
    const n = len(this)
    for (const i of range(n / 2)) {
      const [n1, n2] = [this.get(n - i - 1), this.get(i)]
      this.set(i, n1)
      this.set(n - i - 1, n2)
    }
  }
}
