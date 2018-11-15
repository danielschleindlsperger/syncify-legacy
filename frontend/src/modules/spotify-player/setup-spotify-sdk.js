import * as R from 'ramda'
import { authUser } from 'root/modules/auth/lenses'
import { bootstrapEvents } from './events/bootstrap-events'

const loadSpotifyScript = () => {
  const script = document.createElement('script')
  script.src = 'https://sdk.scdn.co/spotify-player.js'
  document.body.appendChild(script)
}

// required by spotify sdk
// :: String -> Promise SpotifyPlayer
export const registerSpotifyListener = store => ({ accessToken }) => {
  window.onSpotifyWebPlaybackSDKReady = () => {
    const player = new Spotify.Player({
      name: 'Syncify Web Player',
      getOAuthToken: cb => {
        cb(accessToken)
      },
    })
    bootstrapEvents(store)(player)
    player.connect()
    // todo: hook player errors up with app event handling
    // todo: persist player instance in store for volume control etc
  }
}

// :: ReduxStore -> Promise SpotifyPlayer
export const initSpotifySdk = store =>
  R.pipe(
    store => store.getState(),
    R.view(authUser),
    registerSpotifyListener(store),
    () => loadSpotifyScript(),
  )(store)
