const loadSpotifyScript = () => {
  const script = document.createElement('script')
  script.src = 'https://sdk.scdn.co/spotify-player.js'
  document.body.appendChild(script)
}

// required by spotify sdk
// :: String -> Promise SpotifyPlayer
export const registerSpotifyListener = accessToken =>
  new Promise(resolve => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new Spotify.Player({
        name: 'Syncify Web Player',
        getOAuthToken: cb => {
          cb(accessToken)
        },
      })
      resolve(player)
      // bootstrapEvents(store)(player)
      player.connect()
      // todo: hook player errors up with app event handling
      // todo: persist player instance in store for volume control etc
    }
  })

export const initSpotifySdk = ({ accessToken }) => {
  // might cause synchronicity issues
  loadSpotifyScript()
  return registerSpotifyListener(accessToken)
}
