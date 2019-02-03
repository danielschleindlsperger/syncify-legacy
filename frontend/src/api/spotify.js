import SpotifyWebApi from 'spotify-web-api-js'
import { pipe, concat, map, splitEvery } from 'ramda'

export const spotifyFactory = accessToken => {
  const spotify = new SpotifyWebApi()
  spotify.setAccessToken(accessToken)
  return spotify
}

export const setWebPlayerAsActiveDevice = (accessToken, deviceId) =>
  spotifyFactory(accessToken).transferMyPlayback([deviceId], {
    // in case user is already listening on another device we need to stop playback
    play: false,
  })

export const getMyPlaylists = accessToken => spotifyFactory(accessToken).getUserPlaylists()

export const getPlaylist = (accessToken, playlistId) =>
  spotifyFactory(accessToken).getPlaylist(playlistId)

export const getSongs = (accessToken, songIds = []) => {
  const spotify = spotifyFactory(accessToken)
  const tracks = Promise.all(splitEvery(50, songIds).map(spotify.getTracks)).then(
    pipe(
      map(x => x.tracks),
      trackLists => trackLists.reduce(concat),
    ),
  )

  return tracks
}
