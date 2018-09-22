import { query } from './query'

describe('query', () => {
  it('extracts non duplicated query parameters to object', () => {
    const mockWindow = { location: { href: 'http://test.com?foo=bar&fu=gazi' }}
    expect(query(mockWindow)).toEqual({ foo: 'bar', fu: 'gazi' })
  })

  it('sets missing values to undefined', () => {
    const mockWindow = { location: { href: 'http://test.com?keyWithMissingValue' }}
    expect(query(mockWindow)).toEqual({ keyWithMissingValue: undefined })
  })

  it('returns empty object if no query string is present', () => {
    const mockWindow = { location: { href: 'http://test.com' }}
    expect(query(mockWindow)).toEqual({})
  })
})