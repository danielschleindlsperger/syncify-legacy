import { createStore } from '../index.js'

let store

beforeEach(() => {
  store = createStore()
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
  expect(store.getState().auth.user).toBe(user)
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
  expect(store.select.auth.tokenValid(state)).toBe(true)
})

test(`determines token is not valid when token is empty`, () => {
  const validUntil = Date.now() + 1000
  store.dispatch.auth.setAuth({ validUntil })
  const state = store.getState()
  expect(store.select.auth.tokenValid(state)).toBe(false)
})

test(`determines token is not valid when it's expired`, () => {
  const token = 'token'
  const validUntil = Date.now() - 1000
  store.dispatch.auth.setAuth({ token, validUntil })
  const state = store.getState()
  expect(store.select.auth.tokenValid(state)).toBe(false)
})
