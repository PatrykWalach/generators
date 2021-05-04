import { slice, ValueError } from '../../src'

describe('slice()', () => {
  describe('step > 0', () => {
    it('start + length < 0', () => {
      expect(slice(-12, 0).indices(5)).toMatchObject([0, 0, 1])
    })

    it('start + length >= 0', () => {
      expect(slice(-4, 0).indices(5)).toMatchObject([1, 0, 1])
    })

    it('start >= length', () => {
      expect(slice(6, 0).indices(5)).toMatchObject([5, 0, 1])
    })

    it('stop + length < 0', () => {
      expect(slice(-12).indices(5)).toMatchObject([0, 0, 1])
    })

    it('stop + length >= 0', () => {
      expect(slice(-4).indices(5)).toMatchObject([0, 1, 1])
    })

    it('stop >= length', () => {
      expect(slice(6).indices(5)).toMatchObject([0, 5, 1])
    })
  })

  describe('step < 0', () => {
    it('start + length < 0', () => {
      expect(slice(-12, 0, -1).indices(5)).toMatchObject([-1, 0, -1])
    })

    it('start + length >= 0', () => {
      expect(slice(-4, 0, -1).indices(5)).toMatchObject([1, 0, -1])
    })

    it('start >= length', () => {
      expect(slice(6, 0, -1).indices(5)).toMatchObject([4, 0, -1])
    })

    it('stop + length < 0', () => {
      expect(slice(-12, undefined, -1).indices(5)).toMatchObject([-1, -1, -1])
    })

    it('stop + length >= 0', () => {
      expect(slice(-4, undefined, -1).indices(5)).toMatchObject([1, -1, -1])
    })

    it('stop >= length', () => {
      expect(slice(6, undefined, -1).indices(5)).toMatchObject([4, -1, -1])
    })
  })

  it('length < 0', () => {
    expect(() => slice(2, -4, -3).indices(-5)).toThrowError(ValueError)
  })
})
