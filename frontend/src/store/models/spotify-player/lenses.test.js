import { createStore } from '../../index'
import { connected, deviceId, playerState } from './lenses'

let store

beforeEach(() => {
  store = createStore()
})

test('can get connected value from state', () => {
  expect(connected(store.getState())).toBe(false)
})

test('can get deviceId from state', () => {
  expect(deviceId(store.getState())).toBe(null)
})

test('can get playerState from state', () => {
  expect(playerState(store.getState())).toBe(null)
})
