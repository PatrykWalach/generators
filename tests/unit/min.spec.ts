import { min } from '../../src'

describe('min()', () => {
  it('array', () => {
    expect(min([3, 2, 8, 5, 10, 6])).toStrictEqual(2)
  })

  it('empty array', () => {
    expect(min([])).toStrictEqual(undefined)
  })
})
