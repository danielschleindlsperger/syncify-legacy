import { updateUser, setWebPlayerAsActiveDevice } from '../../../api'
import { viewToken, viewAccessToken, viewUser, viewPlayerSdk } from '../../lenses'
import { applyAll } from '../../../utils'

const loadSpotifyScript = () => {
  const script = document.createElement('script')
  script.src = 'https://sdk.scdn.co/spotify-player.js'
  document.body.appendChild(script)
}

// required by spotify sdk
// :: Function -> Promise SpotifyPlayer
export const registerSpotifyListener = getAccessToken =>
  new Promise(resolve => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new Spotify.Player({
        name: 'Syncify Web Player',
        getOAuthToken: callback => {
          callback(getAccessToken())
        },
      })
      resolve(player)
      player.connect()
      // todo: hook player errors up with app event handling
    }
  })

export const spotifyPlayer = {
  state: {
    connected: false,
    deviceId: null,
    // object returned by spotify web sdk
    playerState: null,
    playerSdk: null,
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
    setPlayerSdk(state, playerSdk) {
      return { ...state, playerSdk }
    },
  },
  effects: dispatch => ({
    async initSdk(store, rootState) {
      // might cause synchronicity issues
      loadSpotifyScript()
      // call with store instead of concrete state to allow the spotify sdk to get the current value each time
      const player = await registerSpotifyListener(() => viewAccessToken(store.getState()))
      dispatch.spotifyPlayer.setPlayerSdk(player)
      dispatch.spotifyPlayer.hookupEvents(player)
      return player
    },
    hookupEvents(player) {
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
    async setPlayerDeviceId(deviceId, rootState) {
      if (deviceId) {
        const [user, accessToken, token] = applyAll([viewUser, viewAccessToken, viewToken])(
          rootState,
        )
        updateUser(token, user.id, { deviceId })
        await setWebPlayerAsActiveDevice(accessToken, deviceId)
        dispatch.spotifyPlayer.setDeviceId(deviceId)
      }
    },
  }),
}
