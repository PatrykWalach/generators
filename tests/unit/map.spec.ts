import { map, pipe, toArray } from '../../src'

describe('map()', () => {
  it('array', () => {
    expect(
      pipe(
        [1, 2, 3, 4],
        map((x) => x * x),
        toArray,
      ),
    ).toMatchObject([1, 4, 9, 16])
  })

  it('multiple arrays', () => {
    expect(
      pipe(
        map([4, 5, 6], [5, 6, 7], (a, b) => a + b),
        toArray,
      ),
    ).toMatchObject([9, 11, 13])
  })

  it('types', () => {
    const it: Iterable<string> = pipe(
      map(
        ['a'],
        [1],
        [false],
        (str: string, n: number, nul: boolean) => str + n.toString() + nul,
      ),
      toArray,
    )

    expect([...it]).toMatchObject(['a1false'])
  })
})
