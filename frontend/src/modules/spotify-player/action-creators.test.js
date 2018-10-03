import { setPlayerState, setConnected } from './action-creators'
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
  it('sets connected to true', () => {
    store.dispatch(setConnected(true))
    expect(store.getState().connected).toBe(true)
  })

  it('sets connected to false', () => {
    store.dispatch(setConnected(false))
    expect(store.getState().connected).toBe(false)
  })
})