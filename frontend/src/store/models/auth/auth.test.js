import { createStore } from '../../store.js'
import { getMe } from '../../../api'

const FAKE_DATE_NOW = 1541354997536
const ONE_HOUR_IN_MILLIS = 3600000

jest.mock('../../../api', () => ({
  getMe: jest.fn(() => Promise.resolve({ name: 'Foo' })),
}))

let store

beforeEach(() => {
  store = createStore()
})

afterEach(() => {
  jsdom.reconfigure({
    url: 'http://localhost',
  })
  jest.restoreAllMocks()
})

test('can set token', () => {
  store.dispatch.auth.setToken('token')
  expect(store.getState().auth.token).toBe('token')
})

test('can set token validity', () => {
  const validUntil = Date.now()
  store.dispatch.auth.setTokenValidUntil(validUntil)
  expect(store.getState().auth.validUntil).toBe(validUntil)
})

test('can set user', () => {
  const user = { name: 'Foo' }
  store.dispatch.auth.setUser(user)
  expect(store.getState().auth.user).toEqual(user)
})

test('can token and validity at once', () => {
  const token = 'token'
  const validUntil = Date.now()
  store.dispatch.auth.setAuth({ token, validUntil })
  expect(store.getState().auth.token).toBe('token')
  expect(store.getState().auth.validUntil).toBe(validUntil)
})

test(`determines token is valid when token exists and it's not expired`, () => {
  const token = 'token'
  const validUntil = Date.now() + 1000
  store.dispatch.auth.setAuth({ token, validUntil })
  const state = store.getState()
  expect(store.select.auth.isLoggedIn(state)).toBe(true)
})

test(`determines token is not valid when token is empty`, () => {
  const validUntil = Date.now() + 1000
  store.dispatch.auth.setAuth({ validUntil })
  const state = store.getState()
  expect(store.select.auth.isLoggedIn(state)).toBe(false)
})

test(`determines token is not valid when it's expired`, () => {
  const token = 'token'
  const validUntil = Date.now() - 1000
  store.dispatch.auth.setAuth({ token, validUntil })
  const state = store.getState()
  expect(store.select.auth.isLoggedIn(state)).toBe(false)
})

test(`gets a valid token from query string`, async () => {
  jsdom.reconfigure({
    url: 'http://localhost?token=tokenFromQuery',
  })
  Date.now = jest.fn(() => FAKE_DATE_NOW)

  await store.dispatch.auth.initialToken()
  const state = store.getState()

  expect(state.auth.token).toBe('tokenFromQuery')
  expect(state.auth.validUntil).toBe(FAKE_DATE_NOW + ONE_HOUR_IN_MILLIS)
})

test(`doesn't explode when not query string exists`, async () => {
  await store.dispatch.auth.initialToken()
  const state = store.getState()

  expect(state.auth.token).toBe(null)
  expect(state.auth.validUntil).toBe(0)
})

test(`fetches and sets user`, async () => {
  store.dispatch.auth.setToken('token')
  await store.dispatch.auth.fetchUser()

  const state = store.getState()
  expect(state.auth.user).toEqual({ name: 'Foo' })
  expect(getMe).toHaveBeenCalledWith('token')
})
