import { zip } from '../../src'

describe('zip', () => {
  it('right longer', () => {
    expect([...zip(['a', 'b'], ['c', 'd', 'f'])]).toMatchObject([
      ['a', 'c'],
      ['b', 'd'],
    ])
  })

  it('left longer', () => {
    expect([...zip(['a', 'b', 'c'], ['d', 'f'])]).toMatchObject([
      ['a', 'd'],
      ['b', 'f'],
    ])
  })
  it('types', () => {
    const it: Iterable<[string, number, null]> = zip(['a'], [1], [null])

    expect([...it]).toMatchObject([['a', 1, null]])
  })
})
