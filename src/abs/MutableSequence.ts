import { len } from '../len'
import { range } from '../range'
import { Sequence } from './Sequence'

export abstract class MutableSequence<T> extends Sequence<T> {
  abstract insert(index: number, value: T): void

  append(value: T): void {
    this.insert(len(this), value)
  }

  clear() {
    while (this.pop() !== undefined) {}
  }

  pop(index = len(this) - 1) {
    if (len(this) < 1) {
      return
    }
    const v = this[index]
    delete this[index]

    return v
  }

  reverse() {
    const n = len(this)
    for (const i of range(n / 2)) {
      const [n1, n2] = [this[n - i - 1], this[i]]
      this[i] = n1
      this[n - i - 1] = n2
    }
  }

  extend(values: Iterable<T>) {
    if (values === this) {
      values = [...values]
    }
    for (const v of values) {
      this.append(v)
    }
  }

  remove(value: T) {
    delete this[this.indexOf(value)]
  }
}
