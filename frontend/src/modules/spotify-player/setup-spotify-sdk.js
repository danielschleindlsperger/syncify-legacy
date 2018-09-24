import * as R from 'ramda'
import { promise } from 'root/utils/promise'
import { authUser } from 'root/modules/auth/lenses'
import { bootstrapEvents } from './events/bootstrap-events'

// required by spotify sdk
// :: String -> Promise SpotifyPlayer
export const registerSpotifyListener = store => ({ accessToken }) => promise(resolve => {
  window.onSpotifyWebPlaybackSDKReady = () => {
    const player = new Spotify.Player({
      name: 'Syncify Web Player',
      getOAuthToken: cb => { cb(accessToken) }
    })

    bootstrapEvents(store)(player)

    player.connect()
    resolve(player)
    // todo: hook player errors up with app event handling
  }
})

// :: ReduxStore -> Promise SpotifyPlayer
export const initSpotifySdk = store => R.pipe(
  store => store.getState(),
  R.view(authUser),
  registerSpotifyListener(store),
)(store)