import { isAuthorized } from './withAuth'

describe('isAuthorized', () => {
  test('happy path', () => {
    const authStateSlice = {
      authToken: 'totally secure crypto token',
      validUntil: Date.now() + 1000, // very much in the future (because millis > seconds)
    }
    expect(isAuthorized(authStateSlice)).toBe(true)
  })

  it('rejects when authToken is null', () => {
    const authStateSlice = {
      authToken: null,
      validUntil: Date.now(), // very much in the future (because millis > seconds)
    }
    expect(isAuthorized(authStateSlice)).toBe(false)
  })

  it('rejects when token is not valid anymore', () => {
    const authStateSlice = {
      authToken: 'totally secure crypto token',
      validUntil: (Date.now() / 1000) - 1, // not in the future, not valid
    }
    expect(isAuthorized(authStateSlice)).toBe(false)
  })
})