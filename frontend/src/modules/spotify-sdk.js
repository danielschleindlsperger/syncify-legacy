import * as R from 'ramda'
import { promise } from '../utils/promise'
import { authUser } from './auth/lenses'

// required by spotify sdk
// :: String -> Promise SpotifyPlayer
export const registerSpotifyListener = ({ accessToken }) => promise(resolve => {
  window.onSpotifyWebPlaybackSDKReady = () => {
    const player = new Spotify.Player({
      name: 'Syncify Web Player',
      getOAuthToken: cb => { cb(accessToken) }
    })

    player.connect()
    resolve(player)
    // todo: hook player errors up with app event handling
  }
})

// :: ReduxStore -> Promise SpotifyPlayer
export const initSpotifySdk = store => R.pipe(
  store => store.getState(),
  R.view(authUser),
  registerSpotifyListener,
)(store)