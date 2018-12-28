import { createStore } from '../../index'
import { token, validUntil, user } from './lenses'

let store

beforeEach(() => {
  store = createStore()
})

test('can get token from state', () => {
  expect(token(store.getState())).toBe(null)
})

test('can get token validity from state', () => {
  expect(validUntil(store.getState())).toBe(0)
})

test('can get user from state', () => {
  expect(user(store.getState())).toBe(null)
})
