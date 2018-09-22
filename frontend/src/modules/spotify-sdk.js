import * as R from 'ramda'

// :: ReduxStore -> Promise SpotifyPlayer
export const initSpotifySdk = store => R.pipe(
  store => store.getState(),
  R.prop('authToken'),
  registerSpotifyListener,
)(store)

// required by spotify sdk
// :: String -> Promise SpotifyPlayer
export const registerSpotifyListener = accessToken => new Promise(resolve => {
  window.onSpotifyWebPlaybackSDKReady = () => {
    const player = new Spotify.Player({
      name: 'Syncify Web Player',
      getOAuthToken: cb => { cb(accessToken) }
    })
    resolve(player)

    // todo: hook player errors up with app event handling
  }
})