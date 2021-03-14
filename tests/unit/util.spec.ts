import { compare } from '../../src'

describe('util', () => {
  describe('compare()', () => {
    it('same length', () => {
      const a = [1, 2, 3]
      const b = [1, 2, 4]
      expect(compare(a, b)).toBeLessThan(0)
    })
    it('same length and value', () => {
      const a = [1, 2, 3]
      const b = [1, 2, 3]
      expect(compare(a, b)).toStrictEqual(0)
    })
    it('objects', () => {
      const a = {}
      const b = {}
      expect(compare(a, b)).toStrictEqual(0)
    })
    it('diffrent length', () => {
      const a = [1, 2]
      const b = [1, 2, 3]
      expect(compare(a, b)).toBeLessThan(0)
    })
    it('diffrent length', () => {
      const a = [1, 2, 3]
      const b = [1, 2]
      expect(compare(a, b)).toBeGreaterThan(0)
    })
  })
})
