import SpotifyWebApi from 'spotify-web-api-js'

export const spotifyFactory = accessToken => {
  const spotify = new SpotifyWebApi()
  spotify.setAccessToken(accessToken)
  return spotify
}

export const setWebPlayerAsActiveDevice = (accessToken, deviceId) => {
  console.log('setWebPlayerAsActiveDevice', accessToken, deviceId)
  return spotifyFactory(accessToken).transferMyPlayback([deviceId], {
    // in case user is already listening on another device we need to stop playback
    play: false,
  })
}

export const getMyPlaylists = accessToken => spotifyFactory(accessToken).getUserPlaylists()

export const getPlaylist = (accessToken, playlistId) =>
  spotifyFactory(accessToken).getPlaylist(playlistId)

export const getSongs = (accessToken, songIds) =>
  spotifyFactory(accessToken)
    .getTracks(songIds)
    .then(x => x.tracks)
