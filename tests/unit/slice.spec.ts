import { Slice, slice, ValueError } from '../../src'

describe('slice()', () => {
  describe('attrs', () => {
    it('start:', () => {
      expect(slice(2, null)).toMatchObject({
        start: 2,
        stop: Infinity,
        step: 1,
      })
    })

    it(':stop', () => {
      expect(slice(2)).toMatchObject({
        start: 0,
        stop: 2,
        step: 1,
      })
    })

    it('start:stop', () => {
      expect(slice(-12, 0)).toMatchObject({
        start: -12,
        stop: 0,
        step: 1,
      })
    })

    it('start::step', () => {
      expect(slice(-12, null, -1)).toMatchObject({
        start: -12,
        stop: -Infinity,
        step: -1,
      })
    })

    it('start:stop:step', () => {
      expect(slice(-12, 4, -1)).toMatchObject({
        start: -12,
        stop: 4,
        step: -1,
      })
    })

    it('::', () => {
      expect(slice()).toMatchObject({
        start: 0,
        stop: Infinity,
        step: 1,
      })
    })
  })

  describe('Slice.from', () => {
    it('start:', () => {
      expect(Slice.from('2:')).toMatchObject(slice(2, null))
    })

    it(':stop', () => {
      expect(Slice.from(':2')).toMatchObject(slice(2))
    })

    it('start:stop', () => {
      expect(Slice.from('-12:0')).toMatchObject(slice(-12, 0))
    })

    it('start::step', () => {
      expect(Slice.from('-12::-1')).toMatchObject(slice(-12, null, -1))
    })

    it('start:stop:step', () => {
      expect(Slice.from('-12:4:-1')).toMatchObject(slice(-12, 4, -1))
    })

    it('::', () => {
      expect(Slice.from('::')).toMatchObject(slice())
    })
  })

  describe('step > 0', () => {
    it('start + length < 0', () => {
      expect(Slice.from('-12:0').indices(5)).toMatchObject([0, 0, 1])
    })

    it('start + length >= 0', () => {
      expect(Slice.from('-4:0').indices(5)).toMatchObject([1, 0, 1])
    })

    it('start >= length', () => {
      expect(Slice.from('6:0').indices(5)).toMatchObject([5, 0, 1])
    })

    it('stop + length < 0', () => {
      expect(Slice.from(':-12').indices(5)).toMatchObject([0, 0, 1])
    })

    it('stop + length >= 0', () => {
      expect(Slice.from(':-4').indices(5)).toMatchObject([0, 1, 1])
    })

    it('stop >= length', () => {
      expect(Slice.from(':6').indices(5)).toMatchObject([0, 5, 1])
    })
  })

  describe('step < 0', () => {
    it('start + length < 0', () => {
      expect(Slice.from('-12:0:-1').indices(5)).toMatchObject([-1, 0, -1])
    })

    it('start + length >= 0', () => {
      expect(Slice.from('-4:0:-1').indices(5)).toMatchObject([1, 0, -1])
    })

    it('start >= length', () => {
      expect(Slice.from('6:0:-1').indices(5)).toMatchObject([4, 0, -1])
    })

    it('stop + length < 0', () => {
      expect(Slice.from('-12::-1').indices(5)).toMatchObject([-1, -1, -1])
    })

    it('stop + length >= 0', () => {
      expect(Slice.from('-4::-1').indices(5)).toMatchObject([1, -1, -1])
    })

    it('stop >= length', () => {
      expect(Slice.from('6::-1').indices(5)).toMatchObject([4, -1, -1])
    })
  })

  it('length < 0', () => {
    expect(() => Slice.from('2:-4:-3').indices(-5)).toThrowError(ValueError)
  })
})
