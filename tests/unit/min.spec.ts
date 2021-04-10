import { min, ValueError } from '../../src'

describe('min()', () => {
  it('array', () => {
    expect(min([3, 2, 8, 5, 10, 6])).toStrictEqual(2)
  })

  it('empty array', () => {
    expect(() => min([])).toThrowError(ValueError)
  })

  it('empty array with default', () => {
    const r = min([], { default: null })
    expect(r).toStrictEqual(null)
  })

  it('key', () => {
    const r = min(
      [3, 2, 8, 5, 10, 6].map((value) => ({ value })),
      { key: ({ value }) => value },
    )
    expect(r).toMatchObject({ value: 2 })
  })
})
