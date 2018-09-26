import { setPlayerState } from './action-creators'
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