import {
  query
} from './query'

describe('query', () => {

  afterEach(() => {
    window.localStorage.clear()
    jsdom.reconfigure({
      url: "http://localhost"
    });
  })

  it('extracts non duplicated query parameters to object', () => {
    jsdom.reconfigure({
      url: "http://localhost?foo=bar&fu=gazi"
    })
    expect(query()).toStrictEqual({
      foo: 'bar',
      fu: 'gazi'
    })
  })

  it('sets missing values to undefined', () => {
    jsdom.reconfigure({
      url: "http://localhost?keyWithMissingValue"
    })
    expect(query()).toStrictEqual({
      keyWithMissingValue: undefined
    })
  })

  it('returns empty object if no query string is present', () => {
    jsdom.reconfigure({
      url: "http://localhost"
    })
    expect(query()).toStrictEqual({})
  })

  it('returns empty object if nothing comes after query string delimiter', () => {
    jsdom.reconfigure({
      url: "http://localhost?"
    })
    expect(query()).toStrictEqual({})
  })

  it('handles ampersand at last position', () => {
    jsdom.reconfigure({
      url: "http://localhost?foo=bar&"
    })
    expect(query()).toStrictEqual({
      foo: 'bar'
    })
  })
})
