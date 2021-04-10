import { max, ValueError } from '../../src'

describe('max()', () => {
  it('array', () => {
    expect(max([3, 2, 8, 5, 10, 6])).toStrictEqual(10)
  })

  it('empty array', () => {
    expect(() => max([])).toThrowError(ValueError)
  })

  it('empty array with default', () => {
    const r = max([], { default: null })
    expect(r).toStrictEqual(null)
  })

  it('key', () => {
    const r = max(
      [3, 2, 8, 5, 10, 6].map((value) => ({ value })),
      { key: ({ value }) => value },
    )
    expect(r).toMatchObject({ value: 10 })
  })
})
