import { from, Observable } from 'rxjs'
import { prop } from 'ramda'
import axios, { AxiosError } from 'axios'
import { spotifyFactory } from './spotify-web-api'
import { logAndRethrow } from '../../../util'

const formatSpotifyApiError = (err: AxiosError, additionalMessage?: string) => {
  const spotifyError = err.response && err.response.data && err.response.data.error
  if (spotifyError) {
    const { status, message, reason } = spotifyError
    console.error(`
      ${additionalMessage}
      STATUS: ${status}
      MESSAGE: ${message}
      REASON: ${reason}
    `)
  } else {
    console.error(`
    ${additionalMessage}
    ${err.message}
    `)
  }
}

export const playTracks = (accessToken: string) => (
  tracks: string[],
  offset: number = 0,
): Observable<any> => {
  return from(
    spotifyFactory({ accessToken })
      .play({ uris: tracks })
      .then(prop('body')),
  ).pipe(logAndRethrow('Error playing song with Spotify API'))
}

export const playTrack = (accessToken: string, songUri: string, songOffset: number = 0) =>
  axios
    .put(
      'https://api.spotify.com/v1/me/player/play',
      {
        uris: [songUri],
        position_ms: songOffset,
      },
      { headers: { Authorization: `Bearer ${accessToken}` } },
    )
    .then(res => res.data)
    .catch((err: AxiosError) => {
      formatSpotifyApiError(err, `Could not play song "${songUri}" with Spotify API`)
    })
