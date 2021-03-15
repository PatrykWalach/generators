import { map } from '../../src'

describe('map()', () => {
  it('array', () => {
    expect([...map([1, 2, 3, 4], (x) => x * x)]).toMatchObject([1, 4, 9, 16])
  })

  it('multiple arrays', () => {
    expect([...map([4, 5, 6], [5, 6, 7], (a, b) => a + b)]).toMatchObject([
      9,
      11,
      13,
    ])
  })

  it('types', () => {
    const it: Iterable<string> = map(
      ['a'],
      [1],
      [false],
      (str: string, n: number, nul: boolean) => str + n.toString() + nul,
    )

    expect([...it]).toMatchObject(['a1false'])
  })
})
