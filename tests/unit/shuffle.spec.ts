import { pipe, range, toArray } from '../../src'
import { shuffle } from '../../src/random/shuffle'

// Math.floor(Math.random

// jest.mock

global.Math.random = () => 0.99

describe('shuffle()', () => {
  it('shuffles', () => {
    const shuffled = pipe(range(5), shuffle, toArray)
    expect(shuffled).toMatchObject([4, 3, 2, 1, 0])
  })
})
