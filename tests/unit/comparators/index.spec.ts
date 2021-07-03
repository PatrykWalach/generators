import * as Comparator from '../../../src/comparators'

describe('comparators', () => {
  describe('iterable()', () => {
    it('same length', () => {
      const a = [1, 2, 3]
      const b = [1, 2, 4]
      expect(Comparator.iterable(Comparator.number)(a, b)).toBeLessThan(0)
    })
    it('same length and value', () => {
      const a = [1, 2, 3]
      const b = [1, 2, 3]
      expect(Comparator.iterable(Comparator.number)(a, b)).toStrictEqual(0)
    })

    it('diffrent length', () => {
      const a = [1, 2]
      const b = [1, 2, 3]
      expect(Comparator.iterable(Comparator.number)(a, b)).toBeLessThan(0)
    })
    it('diffrent length', () => {
      const a = [1, 2, 3]
      const b = [1, 2]
      expect(Comparator.iterable(Comparator.number)(a, b)).toBeGreaterThan(0)
    })
  })

  describe('universal()', () => {
    it('same length', () => {
      const a = [1, 2, 3]
      const b = [1, 2, 4]
      expect(Comparator.universal(a, b)).toBeLessThan(0)
    })
    it('same length and value', () => {
      const a = [1, 2, 3]
      const b = [1, 2, 3]
      expect(Comparator.universal(a, b)).toStrictEqual(0)
    })
    it('objects', () => {
      const a = {}
      const b = {}
      expect(Comparator.universal(a, b)).toStrictEqual(0)
    })
    it('diffrent length', () => {
      const a = [1, 2]
      const b = [1, 2, 3]
      expect(Comparator.universal(a, b)).toBeLessThan(0)
    })
    it('objects', () => {
      const a = {}
      const b = {}
      expect(Comparator.universal(a, b)).toStrictEqual(0)
    })
    it('diffrent length', () => {
      const a = [1, 2, 3]
      const b = [1, 2]
      expect(Comparator.universal(a, b)).toBeGreaterThan(0)
    })
  })
})
