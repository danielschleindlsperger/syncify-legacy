import * as types from './action-types'

// ACTIONS CREATORS
export const setPlayerState = playerState => dispatch => {
  dispatch({ type: types.SET_PLAYER_STATE, playerState })
  return playerState
}