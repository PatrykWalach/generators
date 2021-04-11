import { len, quicksort, sorted } from '../../src'

describe('quicksort', () => {
  it('numbers', () => {
    const arr = [4, 12, 1]
    expect([
      ...quicksort(arr, 0, len(arr) - 1, (a, b) => a - b),
    ]).toMatchObject([1, 4, 12])
  })
})

describe('sorted()', () => {
  it('string', () => {
    const string = 'Javascript'
    expect([...sorted(string)]).toMatchObject(
      [...string].sort((a, b) => a.localeCompare(b)),
    )
  })

  it('array', () => {
    const vowels = ['e', 'a', 'u', 'o', 'i']
    expect([...sorted(vowels)]).toMatchObject(
      [...vowels].sort((a, b) => a.localeCompare(b)),
    )
  })

  describe('descending', () => {
    it('string', () => {
      const string = 'Javascript'
      expect([...sorted(string, { reverse: true })]).toMatchObject(
        [...string].sort((a, b) => b.localeCompare(a)),
      )
    })

    it('array', () => {
      const vowels = ['e', 'a', 'u', 'o', 'i']
      expect([...sorted(vowels, { reverse: true })]).toMatchObject(
        [...vowels].sort((a, b) => b.localeCompare(a)),
      )
    })
  })

  describe('key', () => {
    it('primitive', () => {
      const arr = [
        [2, 2],
        [3, 4],
        [4, 1],
        [1, 3],
      ]
      expect([...sorted(arr, { key: ([, v]) => v })]).toMatchObject(
        [...arr].sort(([, a], [, b]) => a - b),
      )
    })
    it('array', () => {
      type Student = [string, number, number]
      const arr: Student[] = [
        ['Alison', 50, 18],
        ['Terence', 75, 12],
        ['David', 75, 20],
        ['Jimmy', 90, 22],
        ['John', 45, 12],
      ]

      const key = ([, mark, age]: Student) => [100 - mark, age]

      expect([...sorted(arr, { key })]).toMatchObject([
        ['Jimmy', 90, 22],
        ['Terence', 75, 12],
        ['David', 75, 20],
        ['Alison', 50, 18],
        ['John', 45, 12],
      ])
    })
  })
})
