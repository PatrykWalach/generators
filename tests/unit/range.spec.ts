import { range, ValueError } from '../../src/range'

describe('range', () => {
  it('infinite', () => {
    expect(() => range(6, 1, 0)).toThrowError(ValueError)
  })

  it('one arg', () => {
    const length = 6
    expect([...range(length)]).toMatchObject(
      Array.from({ length }, (_, i) => i),
    )
  })

  it('two args', () => {
    const first = 2
    const length = 6
    expect([...range(first, length)]).toMatchObject(
      Array.from({ length: length - first }, (_, i) => first + i),
    )
  })

  it('three args', () => {
    const first = 2
    const length = 6
    const step = 3
    expect([...range(first, length, step)]).toMatchObject(
      Array.from(
        { length: Math.ceil((length - first) / step) },
        (_, i) => first + i * step,
      ),
    )
  })
})
