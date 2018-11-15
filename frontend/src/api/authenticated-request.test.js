import { authenticatedRequest } from './authenticated-request'
import { initApi } from './init-api'
import { initStore } from '../store'
import { setExistingAuth } from 'root/modules/auth'

describe('authenticatedRequest', () => {
  let store
  beforeEach(() => {
    store = initStore()
  })
  it('returns axios instance with default auth header', () => {
    store.dispatch(
      setExistingAuth({
        token: 'token',
        validUntil: 12345,
      }),
    )
    initApi(store)
    const axios = authenticatedRequest()
    expect(axios.defaults.headers.Authorization).toBe('Bearer token')
  })

  it('throws when store has no token set', () => {
    initApi(store)
    expect(authenticatedRequest).toThrow(/could not retrieve token/i)
  })

  it('throws when no store is set', () => {
    initApi(null)
    expect(authenticatedRequest).toThrow(/could not retrieve token/i)
  })
})
