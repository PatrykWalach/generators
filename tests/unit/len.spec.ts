import { len } from '../../src'
import { range } from '../../src'

describe('len', () => {
  it('works with array', () => {
    const array = ['', '']
    expect(len(array)).toStrictEqual(array.length)
  })

  it('works with string', () => {
    const string = 'some string'
    expect(len(string)).toStrictEqual(string.length)
  })

  it('works with iterator', () => {
    const last = 7
    expect(len(range(last))).toStrictEqual(last)
  })

})
