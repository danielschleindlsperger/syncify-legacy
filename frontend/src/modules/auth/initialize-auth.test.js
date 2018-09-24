import { initialAuthorization } from './initialize-auth'
import { authReducer } from './reducer'
import { createStoreWithGlobalMiddleware } from 'root/utils/redux-helpers'

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
    expect(store.getState().token).toBe('tokenFromQuery')
    expect(store.getState().validUntil).toBe(13600)
  })

  test('token from localStorage', () => {
    window.localStorage.setItem('JWT', 'tokenFromLocalStorage')
    window.localStorage.setItem('JWT_VALID_UNTIL', 123456)

    initialAuthorization(store)
    expect(store.getState().token).toBe('tokenFromLocalStorage')
    expect(store.getState().validUntil).toBe(123456)
  })

  test('no token at all', () => {
    initialAuthorization(store)
    expect(store.getState().token).toBe(null)
    expect(store.getState().validUntil).toBe(0)
  })
})