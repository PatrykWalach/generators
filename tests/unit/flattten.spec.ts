import { pipe, toArray } from '../../src'
import { flatten } from '../../src/flatten'

describe('flatten', () => {
  it('flattens 0', () => {
    expect(pipe([[1, 2], 'abc', [[3, 4]]], flatten(0), toArray)).toMatchObject([
      [1, 2],
      'abc',
      [[3, 4]],
    ])
  })

  it('flattens 1', () => {
    expect(pipe([[1, 2], 'abc', [[3, 4]]], flatten(1), toArray)).toMatchObject([
      1,
      2,
      'abc',
      [3, 4],
    ])
  })
  
  it('flattens all', () => {
    expect(pipe([[1, 2], 'abc', [[3, 4]]], flatten(), toArray)).toMatchObject([
      1,
      2,
      'abc',
      3,
      4,
    ])
  })
})
