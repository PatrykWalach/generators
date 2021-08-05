import { pipe, toArray, zip } from '../../../src'
import { starmap } from '../../../src/itertools/starmap'

describe('starmap()', () => {
  it('w', () => {
    expect(
      pipe(
        zip([1, 2, 3], [3, 4, 5]),
        starmap((a, b) => a + b),
        toArray,
      ),
    ).toMatchObject([4, 6, 8])
  })
})
