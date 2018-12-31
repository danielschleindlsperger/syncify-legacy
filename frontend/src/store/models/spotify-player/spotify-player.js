import { updateUser, setWebPlayerAsActiveDevice } from '../../../api'
import { viewToken, viewAccessToken, viewUser } from '../../lenses'
import { applyAll } from '../../../utils'

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
    initPlayerState(player) {
      player.addListener('ready', ({ device_id }) => {
        dispatch.spotifyPlayer.setPlayerDeviceId(device_id)
        dispatch.spotifyPlayer.setConnected(true)
      })

      player.addListener('not_ready', () => {
        dispatch.spotifyPlayer.setConnected(false)
      })

      player.addListener('player_state_changed', track => {
        dispatch.spotifyPlayer.setPlayerState(track)
      })
    },
    setPlayerDeviceId(deviceId, rootState) {
      const [user, accessToken, token] = applyAll([viewUser, viewAccessToken, viewToken])(rootState)
      updateUser(token, user.id, { deviceId })

      setWebPlayerAsActiveDevice(accessToken, deviceId)
      dispatch.spotifyPlayer.setDeviceId(deviceId)
    },
  }),
}
