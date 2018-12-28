import { createStore } from '../../index.js'
import { updateUser, setWebPlayerAsActiveDevice } from '../../../api'

jest.mock('../../../api', () => ({
  updateUser: jest.fn(),
  setWebPlayerAsActiveDevice: jest.fn(() => Promise.resolve()),
}))

let store

beforeEach(() => {
  store = createStore()
  jest.restoreAllMocks()
})

test('can set connected state', () => {
  store.dispatch.spotifyPlayer.setConnected(true)
  expect(store.getState().spotifyPlayer.connected).toBe(true)
})

test('can set device id', () => {
  store.dispatch.spotifyPlayer.setDeviceId('device-id')
  expect(store.getState().spotifyPlayer.deviceId).toBe('device-id')
})

test('can set spotify player state', () => {
  const playerState = {
    foo: 'bar',
  }
  store.dispatch.spotifyPlayer.setPlayerState(playerState)
  expect(store.getState().spotifyPlayer.playerState).toEqual(playerState)
})

test('updates user on backend and changes spotify device after setting device id', async () => {
  const deviceId = 'device-id'
  await store.dispatch.spotifyPlayer.setPlayerDeviceId(deviceId)
  expect(store.getState().spotifyPlayer.deviceId).toBe('device-id')
  expect(updateUser).toHaveBeenCalledWith({ deviceId })
  expect(setWebPlayerAsActiveDevice).toHaveBeenCalledTimes(1)
})
