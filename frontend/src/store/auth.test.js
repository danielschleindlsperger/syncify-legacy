import { createStoreWithGlobalMiddleware } from './redux-helpers'
import authReducer, { setExistingAuth, setFreshAuth } from './auth'

let store

beforeEach(() => {
  store = createStoreWithGlobalMiddleware(authReducer)
})

describe('setExistingAuth', () => {
  it('sets token and validity at the same time', () => {
    store.dispatch(setExistingAuth({ authToken: 'token', validUntil: 12345 }))
    const state = store.getState()
    expect(state.authToken).toBe('token')
    expect(state.validUntil).toBe(12345)
  })

  it('returns token and validity values', () => {
    const { authToken, validUntil } = store.dispatch(setExistingAuth({ authToken: 'token', validUntil: 12345 }))
    expect(authToken).toBe('token')
    expect(validUntil).toBe(12345)
  })
})

describe('setFreshAuth', () => {
  it('sets supplied token and validity to one hour in the future ', () => {
    jest.spyOn(Date, 'now').mockImplementation(() => 10000000)
    store.dispatch(setFreshAuth('token'))
    const state = store.getState()
    expect(state.authToken).toBe('token')
    expect(state.validUntil).toBe(13600)
  })

  it('returns token and validity values', () => {
    jest.spyOn(Date, 'now').mockImplementation(() => 10000000)
    const { authToken, validUntil } = store.dispatch(setFreshAuth('token'))
    expect(authToken).toBe('token')
    expect(validUntil).toBe(13600)
  })
})