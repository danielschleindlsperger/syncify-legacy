import { updateUser, setWebPlayerAsActiveDevice } from '../../../api'

export const spotifyPlayer = {
  state: {
    connected: false,
    deviceId: null,
    // object returned by spotify web sdk
    playerState: null,
  },
  reducers: {
    setConnected(state, connected) {
      return { ...state, connected }
    },
    setDeviceId(state, deviceId) {
      return { ...state, deviceId }
    },
    setPlayerState(state, playerState) {
      return { ...state, playerState }
    },
  },
  effects: dispatch => ({
    setPlayerDeviceId(deviceId) {
      updateUser({ deviceId })
      setWebPlayerAsActiveDevice()
      dispatch.spotifyPlayer.setDeviceId(deviceId)
    },
  }),
}
