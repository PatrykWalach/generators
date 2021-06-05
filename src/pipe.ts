import { reduce } from './functools/reduce'

interface UnaryFn<T, R> {
  (source: T): R
}

interface Pipe {
  <T, A>(source: T, op1: UnaryFn<T, A>): A

  <T, A, B>(source: T, op1: UnaryFn<T, A>, op2: UnaryFn<A, B>): B

  <T, A, B, C>(
    source: T,
    op1: UnaryFn<T, A>,
    op2: UnaryFn<A, B>,
    op3: UnaryFn<B, C>,
  ): C

  <T, A, B, C, D>(
    source: T,
    op1: UnaryFn<T, A>,
    op2: UnaryFn<A, B>,
    op3: UnaryFn<B, C>,
    op4: UnaryFn<C, D>,
  ): D

  <T, A, B, C, D, E>(
    source: T,
    op1: UnaryFn<T, A>,
    op2: UnaryFn<A, B>,
    op3: UnaryFn<B, C>,
    op4: UnaryFn<C, D>,
    op5: UnaryFn<D, E>,
  ): E

  <T, A, B, C, D, E, F>(
    source: T,
    op1: UnaryFn<T, A>,
    op2: UnaryFn<A, B>,
    op3: UnaryFn<B, C>,
    op4: UnaryFn<C, D>,
    op5: UnaryFn<D, E>,
    op6: UnaryFn<E, F>,
  ): F

  <T, A, B, C, D, E, F, G>(
    source: T,
    op1: UnaryFn<T, A>,
    op2: UnaryFn<A, B>,
    op3: UnaryFn<B, C>,
    op4: UnaryFn<C, D>,
    op5: UnaryFn<D, E>,
    op6: UnaryFn<E, F>,
    op7: UnaryFn<F, G>,
  ): G

  <T, A, B, C, D, E, F, G, H>(
    source: T,
    op1: UnaryFn<T, A>,
    op2: UnaryFn<A, B>,
    op3: UnaryFn<B, C>,
    op4: UnaryFn<C, D>,
    op5: UnaryFn<D, E>,
    op6: UnaryFn<E, F>,
    op7: UnaryFn<F, G>,
    op8: UnaryFn<G, H>,
  ): H

  (source: unknown, ...ops: UnaryFn<unknown, void>[]): unknown
}

export const pipe: Pipe = (
  source: unknown,
  ...ops: UnaryFn<unknown, void>[]
): unknown => {
  let x = source
  for (const op of ops) {
    x = op(x)
  }
  return x
}
// return reduce((x, op: UnaryFn<unknown, void>) => op(x), source)(ops)
