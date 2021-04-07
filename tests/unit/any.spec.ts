import { any } from '../../src'

describe('any()', () => {
  describe('for arrays', () => {
    it('at least one true value', () => {
      expect(any([1, 3, 4, 0])).toStrictEqual(true)
    })

    it('all values false', () => {
      expect(any([0, false])).toStrictEqual(false)
    })

    it('one true value', () => {
      expect(any([0, false, 5])).toStrictEqual(true)
    })

    it('empty iterable', () => {
      expect(any([])).toStrictEqual(false)
    })
  })

  describe('for strings', () => {
    it('This is good', () => {
      expect(any('This is good')).toStrictEqual(true)
    })

    it(`'0' is true`, () => {
      expect(any('000')).toStrictEqual(true)
    })

    it('empty string', () => {
      expect(any('')).toStrictEqual(false)
    })
  })

  
  //   describe('for objects', () => {
  //     it('one false key', () => {
  //       expect(all({ 0: 'false'})).toStrictEqual(false)
  //     })

  //     it(`all true keys`, () => {
  //       expect(all({ 0: 'false', 1: 'true' })).toStrictEqual(true)
  //     })


  //     it(`no keys`, () => {
  //       expect(all({})).toStrictEqual(false)
  //     })

  //     it(`'0' is true`, () => {
  //       expect(all({ '0': 'false' })).toStrictEqual(true)
  //     })
  //   })
})
