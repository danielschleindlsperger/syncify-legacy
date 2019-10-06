import { neverNil } from './any.util'

describe('neverNil', () => {
  it('throws for nil values', () => {
    expect(() => neverNil('undefined')(undefined)).toThrow()
    expect(() => neverNil('null')(null)).toThrow()
  })

  it('simply returns non-nil values', () => {
    expect(neverNil('one')(1)).toBe(1)
  })
})
