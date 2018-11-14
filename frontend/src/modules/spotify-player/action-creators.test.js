import { setPlayerState, setConnected, setDeviceId } from './action-creators'
import { playerReducer } from './reducer'
import { createStoreWithGlobalMiddleware } from 'root/utils/redux-helpers'

const store = createStoreWithGlobalMiddleware(playerReducer)

describe('setPlayerState', () => {
  it('sets a player state', () => {
    const fakePlayerState = { a: 'foo', b: 'bar' }
    store.dispatch(setPlayerState(fakePlayerState))
    expect(store.getState().playerState).toStrictEqual(fakePlayerState)
  })
})

describe('setConnected', () => {
  it('sets connected state', () => {
    expect(store.getState().connected).toBe(false)
    store.dispatch(setConnected(true))
    expect(store.getState().connected).toBe(true)
  })
})

describe('setDeviceId', () => {
  it('sets deviceId', () => {
    expect(store.getState().deviceId).toBe(null)
    store.dispatch(setDeviceId('a_device_id'))
    expect(store.getState().deviceId).toBe('a_device_id')
  })
})
