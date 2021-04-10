import { MutableSequence } from '../abs/MutableSequence'

import { __reversed__ } from '../abs/Reversible'
import { Sized } from '../abs/Sized'
import { map } from '..'
import { len } from '../len'
import { range } from '../range'
import { Slice } from '../slice'
import { ignore, IndexError } from '../util'

class Tail<T> {
  prev: Head<T> | Node<T>

  constructor(prev: Head<T> | Node<T>) {
    this.prev = prev
  }
}

class Head<T> {
  next: Tail<T> | Node<T>

  constructor() {
    this.next = new Tail(this)
  }
}

class Node<T> {
  prev: Head<T> | Node<T>
  value: T
  next: Tail<T> | Node<T>

  constructor(prev: Head<T> | Node<T>, value: T, next: Tail<T> | Node<T>) {
    this.prev = prev
    this.value = value
    this.next = next
  }
}

export class DeQue<T> extends MutableSequence<T> {
  #length: number = 0
  #head: Head<T>
  #tail: Tail<T>
  maxLen: number | null;

  [index: number]: T

  constructor(values: Sized & Iterable<T>, maxLen?: number) {
    super()

    this.maxLen = maxLen === undefined ? null : maxLen

    this.#head = new Head()
    this.#tail = this.#head.next as Tail<T>

    for (const v of values) {
      this.append(v)
    }
  }

  private getNodeRight(index: number) {
    let i = len(this) - 1
    for (
      let node = this.#tail.prev;
      !(node instanceof Head);
      node = node.prev
    ) {
      if (i-- === index) {
        return node
      }
    }
    throw new IndexError()
  }

  private getNodeLeft(index: number) {
    let i = 0
    for (
      let node = this.#head.next;
      !(node instanceof Tail);
      node = node.next
    ) {
      if (i++ === index) {
        return node
      }
    }
    throw new IndexError()
  }

  private getNode(index: number) {
    if (index < 0) {
      index += len(this)
    }
    if (index < len(this) / 2) {
      return this.getNodeLeft(index)
    }

    return this.getNodeRight(index)
  }

  get(slice: Slice): DeQue<T>
  get(index: number): T
  get(indexOrSlice: number | Slice) {
    if (indexOrSlice instanceof Slice) {
      return new DeQue([
        ...map(range(...indexOrSlice.indices(len(this))), (i) => this.get(i)),
      ])
    }
    return this.getNode(indexOrSlice).value
  }

  delete(index: number) {
    const node = this.getNode(index)

    node.next.prev = node.prev
    node.prev.next = node.next
    this.#length--

    delete this[len(this)]
  }

  set(index: number, value: T) {
    this.getNode(index).value = value
  }
  /**
   * @throws {IndexError} Deque already at its maximum size.
   */
  insert(index: number, value: T) {
    if (len(this) === this.maxLen) {
      throw new IndexError('deque already at its maximum size')
    }

    const s = len(this) === index ? this.#tail : this.getNode(index)
    const n = new Node(s.prev, value, s)
    n.prev.next = n
    n.next.prev = n

    const l = len(this)

    Object.defineProperty(this, l, {
      configurable: true,
      get: () => {
        return this.get(l)
      },
      set: (v) => {
        return this.set(l, v)
      },
    })

    this.#length++
  }

  get length() {
    return this.#length
  }

  *[Symbol.iterator]() {
    for (
      let node = this.#head.next;
      !(node instanceof Tail);
      node = node.next
    ) {
      yield node.value
    }
  }

  *[__reversed__]() {
    for (
      let node = this.#tail.prev;
      !(node instanceof Head);
      node = node.prev
    ) {
      yield node.value
    }
  }

  toString() {
    return `deque([${[...this].join(', ')}])`
  }

  rotate(n = 1) {
    try {
      if (n > 1) {
        while (n-- > 0) {
          this.appendLeft(this.pop())
        }
        return
      }
      while (n++ < 0) {
        this.append(this.popLeft())
      }
    } catch (e) {
      ignore(e, IndexError)
    }
  }

  appendLeft(value: T) {
    try {
      this.insert(0, value)
    } catch (e) {
      ignore(e, IndexError)
      this.pop()
      this.appendLeft(value)
    }
  }

  append(value: T) {
    try {
      this.insert(len(this), value)
    } catch (e) {
      ignore(e, IndexError)
      this.popLeft()
      this.append(value)
    }
  }

  /**
   * @throws {IndexError} Pop from an empty deque.
   */
  popLeft() {
    const n = this.#head.next
    if (n instanceof Tail) {
      throw new IndexError('pop from an empty deque')
    }

    this.#head.next = n.next
    n.next.prev = this.#head

    return n.value
  }

  /**
   * @throws {IndexError} Pop from an empty deque.
   */
  pop() {
    const n = this.#tail.prev
    if (n instanceof Head) {
      throw new IndexError('pop from an empty deque')
    }

    this.#tail.prev = n.prev
    n.prev.next = this.#tail

    return n.value
  }

  extendLeft(values: Iterable<T>) {
    if (values === this) {
      //TODO: replace  [...values] with list(values) after implementing list
      values = [...values]
    }
    for (const v of values) {
      this.appendLeft(v)
    }
  }
}

export const deque = <T>(values: Sized & Iterable<T> = []) => new DeQue(values)
