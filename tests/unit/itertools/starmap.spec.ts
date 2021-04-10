import { zip } from '../../../src'
import { starmap } from '../../../src/itertools/starmap'

describe('starmap()', () => {
  it('w', () => {
    expect([
      ...starmap(zip([1, 2, 3], [3, 4, 5]), (a, b) => a + b),
    ]).toMatchObject([4, 6, 8])
  })
})
