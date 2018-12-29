import SpotifyWebApi from 'spotify-web-api-node'

export const spotifyFactory = accessToken => new SpotifyWebApi({ accessToken })

export const setWebPlayerAsActiveDevice = (accessToken, deviceId) =>
  spotifyFactory(accessToken).transferMyPlayback({
    deviceIds: [deviceId],
    play: true, // keep playing if already listening
  })

export const getMyPlaylists = accessToken =>
  spotifyFactory(accessToken)
    .getUserPlaylists()
    .then(x => x.body)
