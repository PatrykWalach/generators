import { range, reversed, list } from '../../src'

describe('reversed()', () => {
  it('reverses', () => {
    expect([...reversed([12, 2, 3, 5, 4, 6])]).toMatchObject([
      6,
      4,
      5,
      3,
      2,
      12,
    ])
  })

  
  it('reverses range', () => {
    expect([...reversed(range(3))]).toMatchObject([2, 1, 0])
  })
})
