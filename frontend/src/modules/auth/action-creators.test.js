import { createStoreWithGlobalMiddleware } from 'root/utils/redux-helpers'
import { setExistingAuth, setFreshAuth, setUser } from './action-creators'
import { authReducer } from './reducer'

let store

beforeEach(() => {
  store = createStoreWithGlobalMiddleware(authReducer)
})

describe('setExistingAuth', () => {
  it('sets token and validity at the same time', () => {
    store.dispatch(setExistingAuth({ token: 'token', validUntil: 12345 }))
    const state = store.getState()
    expect(state.token).toBe('token')
    expect(state.validUntil).toBe(12345)
  })

  it('returns token and validity values', () => {
    const { token, validUntil } = store.dispatch(setExistingAuth({ token: 'token', validUntil: 12345 }))
    expect(token).toBe('token')
    expect(validUntil).toBe(12345)
  })
})

describe('setFreshAuth', () => {
  it('sets supplied token and validity to one hour in the future ', () => {
    jest.spyOn(Date, 'now').mockImplementation(() => 10000000)
    store.dispatch(setFreshAuth('token'))
    const state = store.getState()
    expect(state.token).toBe('token')
    expect(state.validUntil).toBe(13600)
  })

  it('returns token and validity values', () => {
    jest.spyOn(Date, 'now').mockImplementation(() => 10000000)
    const { token, validUntil } = store.dispatch(setFreshAuth('token'))
    expect(token).toBe('token')
    expect(validUntil).toBe(13600)
  })

  describe('setUser', () => {
    it('sets user', () => {
      const user = {
        id: '123456789',
        name: 'John Doe',
        avatarUrl: 'fb.me/pic.jpg',
        accessToken: 'access_token',
        createdAt: '2018-09-20T18:47:06.972Z',
        updatedAt: '2018-09-24T15:04:38.000Z',
      }
      store.dispatch(setUser(user))
      expect(store.getState().user).toStrictEqual(user)
    })
  })
})