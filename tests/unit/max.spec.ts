import { max } from '../../src'

describe('max()', () => {
  it('array', () => {
    expect(max([3, 2, 8, 5, 10, 6])).toStrictEqual(10)
  })

  it('empty array', () => {
    expect(max([])).toStrictEqual(undefined)
  })
})
