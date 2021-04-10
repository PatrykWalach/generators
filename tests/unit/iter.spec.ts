import { iter, next, StopIteration } from '../../src'

describe('iter', () => {
  it('for array', () => {
    const i = iter(['a', 'e', 'i', 'o', 'u'])

    expect(next(i)).toStrictEqual('a')
    expect(next(i)).toStrictEqual('e')
    expect(next(i)).toStrictEqual('i')
    expect(next(i)).toStrictEqual('o')
    expect(next(i)).toStrictEqual('u')
  })

  it('for custom object', () => {
    class PrintNumber {
      max: number
      num: number
      constructor(max: number) {
        this.max = max
        this.num = Infinity
      }

      [Symbol.iterator]() {
        this.num = 0
        return this
      }

      next(): IteratorResult<number, undefined> {
        if (this.num >= this.max) {
          return { done: true, value: undefined }
        }
        this.num += 1
        return { value: this.num, done: false }
      }
    }

    const i = iter(new PrintNumber(3))

    expect(next(i)).toStrictEqual(1)
    expect(next(i)).toStrictEqual(2)
    expect(next(i)).toStrictEqual(3)
  })

  it('for custom object with sentinel parameter', () => {
    class DoubleIt {
      start: number // = 1

      constructor() {
        this.start = 1
      }

      [Symbol.iterator]() {
        return this
      }

      next() {
        this.start *= 2
        return { value: this.start, done: false }
      }
    }

    const numbers: number[] = [...iter(new DoubleIt(), 16)]

    expect(numbers).toMatchObject([2, 4, 8])
  })
})

describe('next', () => {
  it('throws StopIteration', () => {
    expect(() => next(iter([]))).toThrowError(StopIteration)
  })
})
