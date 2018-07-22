const SpotifyWebApi = require('spotify-web-api-node')
const { prop, curry, pipe } = require('ramda')

// Constructs a new Spotify instance
const spotify = (settings) => new SpotifyWebApi(settings)

// Sets the access token on a spotify instance
const setAccessToken = curry((accessToken, spotify) => {
  spotify.setAccessToken(accessToken)
  return spotify
})

// Creates a Spotify instance with the access token set
const spotifyRequest = accessToken => pipe(
  setAccessToken(accessToken),
)(spotify())

// gets the user data for the provided Spotify access token
const authedUser = accessToken => spotifyRequest(accessToken).getMe().then(prop('body'))

module.exports = {
  spotify,
  spotifyRequest,
  authedUser,
}
