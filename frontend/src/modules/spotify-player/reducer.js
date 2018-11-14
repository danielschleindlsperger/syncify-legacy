import { niceReducer, typedReduce } from 'root/utils/redux-helpers'
import * as types from './action-types'

const initialState = {
  connected: false,
  deviceId: null,
  playerState: null,
}

// REDUCERS
export const playerReducer = niceReducer(initialState, [
  typedReduce(types.SET_PLAYER_CONNECTED, (state, { connected }) => ({ ...state, connected })),
  typedReduce(types.SET_PLAYER_STATE, (state, { playerState }) => ({ ...state, playerState })),
  typedReduce(types.SET_PLAYER_DEVICE_ID, (state, { deviceId }) => ({ ...state, deviceId })),
])
