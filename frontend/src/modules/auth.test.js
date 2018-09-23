import { initialAuthorization } from './auth'
import authReducer from '../store/auth'
import { createStoreWithGlobalMiddleware } from '../store/redux-helpers'

let store

describe('initialAuthorization', () => {

  beforeEach(() => {
    store = createStoreWithGlobalMiddleware(authReducer)
  })

  afterEach(() => {
    window.localStorage.clear()
    jsdom.reconfigure({
      url: "http://localhost"
    });
  })

  test('token in query string', () => {
    jsdom.reconfigure({
      url: "https://www.lululu.com?token=tokenFromQuery"
    });
    jest.spyOn(Date, 'now').mockImplementation(() => 10000000)
    initialAuthorization(store)
    expect(store.getState().authToken).toBe('tokenFromQuery')
    expect(store.getState().validUntil).toBe(13600)
  })

  test('token from localStorage', () => {
    window.localStorage.setItem('JWT', 'tokenFromLocalStorage')
    window.localStorage.setItem('JWT_VALID_UNTIL', 123456)

    initialAuthorization(store)
    expect(store.getState().authToken).toBe('tokenFromLocalStorage')
    expect(store.getState().validUntil).toBe(123456)
  })

  test('no token at all', () => {
    initialAuthorization(store)
    expect(store.getState().authToken).toBe(null)
    expect(store.getState().validUntil).toBe(0)
  })
})