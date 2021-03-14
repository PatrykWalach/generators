import { all } from '../../src'

describe('all()', () => {
  describe('for arrays', () => {
    it('all values true', () => {
      expect(all([1, 2, 3, 4, 5])).toStrictEqual(true)
    })

    it('all values false', () => {
      expect(all([0, false])).toStrictEqual(false)
    })

    it('one false value', () => {
      expect(all([1, 3, 4, 0])).toStrictEqual(false)
    })

    it('one true value', () => {
      expect(all([0, false, 5])).toStrictEqual(false)
    })

    it('empty iterable', () => {
      expect(all([])).toStrictEqual(true)
    })
  })

  describe('for strings', () => {
    it('This is good', () => {
      expect(all('This is good')).toStrictEqual(true)
    })

    it(`'0' is true`, () => {
      expect(all('000')).toStrictEqual(true)
    })

    it('empty string', () => {
      expect(all('')).toStrictEqual(true)
    })
  })

//   describe('for objects', () => {
//     it('one false key', () => {
//       expect(all({ 0: 'false', 1: 'false' })).toStrictEqual(false)
//     })

//     it(`all true keys`, () => {
//       expect(all({ 1: 'true', 2: 'true' })).toStrictEqual(true)
//     })

//     it(`no keys`, () => {
//       expect(all({})).toStrictEqual(true)
//     })

//     it(`'0' is true`, () => {
//       expect(all({ '0': 'true' })).toStrictEqual(true)
//     })
//   })
})
