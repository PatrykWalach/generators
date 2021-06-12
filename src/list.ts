import { reduce } from './functools/reduce'
import { pipe } from './pipe'
import { reversed } from './reversed'
import { callable } from './util'

export type ListNode<T> = {
  hd: T
  tl: ListNode<T> | null
}

export class List<T> implements Iterable<T> {
  #items: ListNode<T> | null

  constructor(...it: T[]) {
    this.#items = pipe(
      it,
      reversed,
      reduce((tl: ListNode<T> | null, hd) => ({ hd, tl }), null),
    )
  }

  static from<T>(it: Iterable<T>) {
    return list(...it)
  }

  *[Symbol.iterator]() {
    let node = this.#items

    while (node !== null) {
      yield node.hd

      node = node.tl
    }
  }

  static add<T>(list: List<T>, hd: T): void {
    list.#items = {
      hd,
      tl: list.#items && list.#items.tl,
    }
  }

  static head<T>(list: List<T>): T | undefined {
    if (list.#items !== null) {
      return list.#items.hd
    }
  }

  static tail<T>(l: List<T>): List<T> {
    const nextList = list<T>()
    nextList.#items = l.#items && l.#items.tl
    return nextList
  }
}

export const list = callable(List)
