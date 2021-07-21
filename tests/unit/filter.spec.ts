import { filter, pipe, toArray } from '../../src'

describe('filter', () => {
  it('filters', () => {
    expect(
      pipe(
        [0, '1', null, undefined, '4'],
        filter((a) => typeof a === 'string'),
        toArray,
      ),
    ).toMatchObject<(string | number)[]>(['1', '4'])
  })

  it('type predicate work', () => {
    const filtered: string[] = pipe(
      [0, '1', null, undefined, '4'],
      filter((a): a is string => typeof a === 'string'),
      toArray,
    )

    expect(filtered).toMatchObject(['1', '4'])
  })

  it('type predicate expect error', () => {
    //@ts-expect-error should be string[]
    const filtered: null[] = pipe(
      [0, '1', null, undefined, '4'],
      filter((a): a is string => typeof a === 'string'),
      toArray,
    )

    expect(filtered).toMatchObject(['1', '4'])
  })
})

describe('data-first filter', () => {
  it('filters', () => {
    expect([
      ...filter([0, '1', null, undefined, '4'], (a) => typeof a === 'string'),
    ]).toMatchObject<(string | number)[]>(['1', '4'])
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
    //@ts-expect-error should be string[]
    const filtered: null[] = [
      ...filter(
        [0, '1', null, undefined, '4'],
        (a): a is string => typeof a === 'string',
      ),
    ]

    expect(filtered).toMatchObject(['1', '4'])
  })
})
