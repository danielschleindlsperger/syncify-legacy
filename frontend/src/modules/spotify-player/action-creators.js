import * as types from './action-types'

// ACTIONS CREATORS
export const setCurrentTrack = current => dispatch => {
  dispatch({ type: types.SET_PLAYER_CURRENT, current })
  return current
}