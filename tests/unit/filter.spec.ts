import { filter } from '../../src'

describe('filter', () => {
  it('filters', () => {
    expect([
      ...filter([0, '1', null, undefined, '4'], (a) => typeof a === 'string'),
    ]).toMatchObject(['1', '4'])
  })

  it('type predicate work', () => {
    const filtered: string[] = [
      ...filter(
        [0, '1', null, undefined, '4'],
        (a): a is string => typeof a === 'string',
      ),
    ]
    expect(filtered).toMatchObject(['1', '4'])
  })

  it('type predicate expect error', () => {
    //@ts-expect-error
    const filtered: null[] = [
      ...filter(
        [0, '1', null, undefined, '4'],
        (a): a is string => typeof a === 'string',
      ),
    ]
    expect(filtered).toMatchObject(['1', '4'])
  })
})
