import { sum } from '../../src'

describe('sum', () => {
  it('array', () => {
    const summed: number = sum([2.5, 3, 4, -5])
    expect(summed).toStrictEqual(4.5)
  })

  it('array with start', () => {
    const summed: number = sum([2.5, 3, 4, -5], 10)
    expect(summed).toStrictEqual(14.5)
  })

  it('boolean + number', () => {
    const summed: number = sum([true, true, false, true], 1)
    expect(summed).toStrictEqual(4)
  })

  it('number + string', () => {
    const summed: string = sum(['a', '', 'c'], 10)
    expect(summed).toStrictEqual('10ac')
  })

  it('bigint + string', () => {
    const summed: string = sum(['a', '', 'c'], 10n)
    expect(summed).toStrictEqual('10ac')
  })

  it('string + boolean', () => {
    const summed: string = sum([true, false], 'a')
    expect(summed).toStrictEqual('atruefalse')
  })

  it('string + any', () => {
    const summed: string = sum([null, undefined, 12, 'b'], 'a')
    expect(summed).toStrictEqual('anullundefined12b')
  })
  it('arr + arr', () => {
    const summed: number[] = sum(
      [
        [1, 2],
        [3, 4],
      ],
      [] as number[],
    )
    expect(summed).toMatchObject([1, 2, 3, 4])
  })
})
