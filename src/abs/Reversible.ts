export const __reversed__ = Symbol('__reversed__')

export interface Reversible<T> extends Iterable<T> {
  readonly length: number
  [__reversed__](): Iterable<T>
}
