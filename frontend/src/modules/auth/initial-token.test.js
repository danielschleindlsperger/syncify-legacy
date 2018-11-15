import { getInitialToken } from './initial-token'

const FAKE_DATE_NOW = 1541354997536
const FAKE_DATE_NOW_SECONDS = Math.round(FAKE_DATE_NOW / 1000)
const ONE_HOUR_IN_SECONDS = 3600

Date.now = jest.fn(() => FAKE_DATE_NOW)

describe('getInitialToken', () => {
  afterEach(() => {
    window.localStorage.clear()
    jsdom.reconfigure({
      url: 'http://localhost',
    })
    Date.now.mockRestore()
  })

  it('returns token from query string', () => {
    jsdom.reconfigure({
      url: 'http://localhost?token=tokenFromQuery',
    })

    expect(getInitialToken()).toStrictEqual({
      token: 'tokenFromQuery',
      validUntil: FAKE_DATE_NOW_SECONDS + ONE_HOUR_IN_SECONDS,
    })
  })

  it('tries localstorage otherwise', () => {
    window.localStorage.setItem('JWT', 'tokenFromLocalStorage')
    window.localStorage.setItem('JWT_VALID_UNTIL', 1541354997)
    expect(getInitialToken()).toStrictEqual({
      token: 'tokenFromLocalStorage',
      validUntil: 1541354997,
    })
  })

  it('throws when no token can be retrieved', () => {
    expect(getInitialToken).toThrow()
  })
})
