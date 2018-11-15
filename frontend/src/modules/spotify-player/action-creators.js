import * as types from './action-types'
import { updateUser, setWebPlayerAsActiveDevice } from '../../api'

// ACTIONS CREATORS
export const setPlayerState = playerState => dispatch => {
  dispatch({ type: types.SET_PLAYER_STATE, playerState })
  return playerState
}

export const setConnected = connected => dispatch => {
  dispatch({ type: types.SET_PLAYER_CONNECTED, connected })
  return connected
}

export const setDeviceId = deviceId => dispatch => {
  dispatch({ type: types.SET_PLAYER_DEVICE_ID, deviceId })
  updateUser({ deviceId })
  setWebPlayerAsActiveDevice()
  return deviceId
}
