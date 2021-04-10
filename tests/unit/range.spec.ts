import { range, Range, reversed, ValueError } from '../../src'

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
    expect([...range(2, 6, 3)]).toMatchObject([2, 5])
  })

  it('decreasing', () => {
    expect([...range(2, -5, -3)]).toMatchObject([2, -1, -4])
  })
  it('is reversible', () => {
    expect([...reversed(range(2, 15, 3))]).toMatchObject([14, 11, 8, 5, 2])
  })
})
