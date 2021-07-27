import { iter, pipe, range, toArray, zip } from '../../src'

describe('zip', () => {
  it('right longer', () => {
    expect(pipe(zip('ab', 'cdf'), toArray)).toMatchObject([
      ['a', 'c'],
      ['b', 'd'],
    ])
  })

  it('left longer', () => {
    expect(pipe(zip('abc', 'df'), toArray)).toMatchObject([
      ['a', 'd'],
      ['b', 'f'],
    ])
  })

  it('types', () => {
    const arr: [string, number, null][] = pipe(zip(['a'], [1], [null]), toArray)

    expect(arr).toMatchObject([['a', 1, null]])
  })
  it('types', () => {
    const it = iter(range(1, 12))

    const zipped = pipe(zip(it, it, it), toArray)

    expect(zipped).toMatchObject([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ])
  })
})
