import SpotifyWebApi from 'spotify-web-api-node'

export const spotifyFactory = accessToken => new SpotifyWebApi({ accessToken })

export const setWebPlayerAsActiveDevice = (accessToken, deviceId) =>
  spotifyFactory(accessToken).transferMyPlayback({
    deviceIds: [deviceId],
    play: false, // in case user is already listening on another device we need to stop playback
  })

export const getMyPlaylists = accessToken =>
  spotifyFactory(accessToken)
    .getUserPlaylists()
    .then(x => x.body)

export const getPlaylist = (accessToken, playlistId) =>
  spotifyFactory(accessToken)
    .getPlaylist(playlistId)
    .then(x => x.body)

export const getSongs = (accessToken, songIds) =>
  spotifyFactory(accessToken)
    .getTracks(songIds)
    .then(x => x.body.tracks)
