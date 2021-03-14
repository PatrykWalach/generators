import { slice } from '../../src'

describe('slice()', () => {
  it('negative', () => {
    const arr = 'Python'

    expect([...slice(arr, -1, -4, -1)]).toMatchObject(['n', 'o', 'h'])
    expect([...slice(arr, -1, -5, -2)]).toMatchObject(['n', 'h'])
  })
  it('out of bounds', () => {
    const arr = ['P', 'y', 't', 'h', 'o', 'n']
    expect([...slice(arr, -1000)]).toMatchObject([])
    expect([...slice(arr, 1000)]).toMatchObject(arr)
  })
})
