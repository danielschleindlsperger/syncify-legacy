import { createStoreWithGlobalMiddleware } from '../../../utils/redux-helpers'
import { setAuth, setUser } from './action-creators'
import { authReducer } from './reducer'

let store

beforeEach(() => {
  store = createStoreWithGlobalMiddleware(authReducer)
})

describe('setAuth', () => {
  it('sets token and validity at the same time', () => {
    store.dispatch(setAuth({ token: 'token', validUntil: 12345 }))
    const state = store.getState()
    expect(state.token).toBe('token')
    expect(state.validUntil).toBe(12345)
  })

  it('returns token and validity values', () => {
    const { token, validUntil } = store.dispatch(setAuth({ token: 'token', validUntil: 12345 }))
    expect(token).toBe('token')
    expect(validUntil).toBe(12345)
  })
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
