import { compare } from '../../src/max'

describe('util', () => {
  describe('compare()', () => {
    it('same length', () => {
      const a = [1, 2, 3]
      const b = [1, 2, 4]
      expect(compare(a, b)).toBeLessThan(0)
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
