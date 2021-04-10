import { deque, slice, str, IndexError } from '../../../src'

describe('deque()', () => {
  it('constructor assigns length', () => {
    const l = deque([12, 2, 3, 5, 4, 6])
    expect(l.length).toStrictEqual(6)
  })

  it('is iterable', () => {
    const l = deque([12, 2, 3, 5, 4, 6])
    expect([...l]).toMatchObject([12, 2, 3, 5, 4, 6])
  })

  it('get()', () => {
    const l = deque([12, 2, 3, 5, 4, 6])
    expect(l.get(0)).toStrictEqual(12)
    expect(l.get(5)).toStrictEqual(6)
    expect(l[0]).toStrictEqual(12)
    expect(l[5]).toStrictEqual(6)
  })

  it('set()', () => {
    const l = deque([1, 2, 3])
    l.set(1, 4)
    expect(l[1]).toStrictEqual(4)
    expect(l.get(1)).toStrictEqual(4)
    l[1] = 5
    expect(l[1]).toStrictEqual(5)
    expect(l.get(1)).toStrictEqual(5)
  })

  it('del()', () => {
    const l = deque([1, 2, 3])
    l.delete(1)
    expect(l.length).toStrictEqual(2)
    expect(l[1]).toStrictEqual(3)
    expect(l[2]).toStrictEqual(undefined)
    expect(l.get(1)).toStrictEqual(3)
  })

  it('get() index < 0', () => {
    const l = deque([12, 2, 3, 5, 4, 6])
    expect(l.get(-6)).toStrictEqual(12)
    expect(l.get(-1)).toStrictEqual(6)
  })

  it('get() IndexError', () => {
    const l = deque([12, 2, 3, 5, 4, 6])
    expect(() => l.get(1000)).toThrowError(IndexError)
    expect(() => l.get(-1000)).toThrowError(IndexError)
    expect(l[1000]).toStrictEqual(undefined)
    expect(l[-1000]).toStrictEqual(undefined)
  })

  describe('rotate', () => {
    it('right', () => {
      const l = deque([1, 2, 3, 4, 5])

      l.rotate(3)

      expect([...l]).toMatchObject([3, 4, 5, 1, 2])
    })

    it('left', () => {
      const l = deque([1, 2, 3, 4, 5])

      l.rotate(-3)

      expect([...l]).toMatchObject([4, 5, 1, 2, 3])
    })
  })

  it('is sliceable', () => {
    const list = deque('Python')

    expect(str('').join(list.get(slice(3)))).toStrictEqual('Pyt')
    expect(str('').join(list.get(slice(1, 6, 2)))).toStrictEqual('yhn')
    expect(str('').join(list.get(slice(-1, -4, -1)))).toStrictEqual('noh')
    expect(str('').join(list.get(slice(-1, -5, -2)))).toStrictEqual('nh')
  })

  // describe('splice', () => {
  //   it('removes', () => {
  //     const l = deque([1, 2, 3, 4, 5])

  //     expect(l.splice(2, 2)).toMatchObject([3, 4])
  //   })

  //   it('has correct length after adding', () => {
  //     const l = deque([1, 2, 5])
  //     l.splice(2, 0, ...[3, 4])
  //     expect(l.length).toStrictEqual(5)
  //   })

  //   it('has correct length after removing', () => {
  //     const l = deque([1, 2, 5])
  //     l.splice(2, 2)
  //     expect(l.length).toStrictEqual(2)
  //   })

  //   it('adds', () => {
  //     const l = deque([1, 2, 5])
  //     l.splice(2, 0, ...[3, 4])

  //     expect([...l]).toStrictEqual([1, 2, 3, 4, 5])
  //   })

  //   it('start more than length', () => {
  //     const l = deque([1, 2, 5])
  //     l.splice(1000, 0, ...[6, 7])

  //     expect([...l]).toStrictEqual([1, 2, 5, 6, 7])
  //   })

  //   it('start less than -length', () => {
  //     const l = deque([3, 4, 5])
  //     l.splice(-1000, 0, ...[1, 2])

  //     expect([...l]).toStrictEqual([1, 2, 3, 4, 5])
  //   })

  //   it('adds for deleteCount less than 0', () => {
  //     const l = deque([3, 4, 7])
  //     l.splice(-1, 0, ...[5, 6])

  //     expect([...l]).toStrictEqual([3, 4, 5, 6, 7])
  //   })

  //   it('deleteCount larger than length', () => {
  //     const l = deque([3, 4, 7])
  //     l.splice(2, 1000, ...[5, 6])

  //     expect([...l]).toStrictEqual([3, 4, 5, 6])
  //   })
  // })
})
