import { range, reversed } from '../../src'

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
})
