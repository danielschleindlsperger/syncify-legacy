import { authenticatedRequest } from './authenticated-request'

describe('authenticatedRequest', () => {
  it('returns axios instance with default auth header', () => {
    const axios = authenticatedRequest('token')
    expect(axios.defaults.headers.Authorization).toBe('Bearer token')
  })

  it('throws when invalid token is passed', () => {
    expect(authenticatedRequest).toThrow(/invalid token/i)
  })
})
