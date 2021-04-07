export const __reversed__ = Symbol('__reversed__')

export interface Reversible<T> extends Iterable<T> {
  length: number
  [__reversed__](this: void): Iterable<T>
}
 