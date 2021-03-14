import { map } from '../../src'

describe('map()', () => {
  it('array', () => {
    expect([...map((x) => x * x, [1, 2, 3, 4])]).toMatchObject([1, 4, 9, 16])
  })

  it('multiple arrays', () => {
    expect([...map((a, b) => a + b, [4, 5, 6], [5, 6, 7])]).toMatchObject([
      9,
      11,
      13,
    ])
  })

  it('types', () => {
    const it: Iterable<string> = map(
      (str: string, n: number, nul: boolean) => str + n.toString() + nul,
      ['a'],
      [1],
      [false],
    )

    expect([...it]).toMatchObject(['a1false'])
  })
})
