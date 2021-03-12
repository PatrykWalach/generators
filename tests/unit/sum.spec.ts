import { sum } from '../../src/sum'

describe('sum', () => {
  it('array', () => {
    expect(sum([2.5, 3, 4, -5])).toStrictEqual(4.5)
  })

  it('array with start', () => {
    expect(sum([2.5, 3, 4, -5], 10)).toStrictEqual(14.5)
  })
})
