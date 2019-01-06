import { from, Observable } from 'rxjs'
import { prop } from 'ramda'
import axios from 'axios'
import { spotifyFactory } from './spotify-web-api'
import { logAndRethrow } from '../../../util'

export const playTracks = (accessToken: string) => (
  tracks: string[],
  offset: number = 0,
): Observable<any> => {
  return from(
    spotifyFactory({ accessToken })
      .play({ uris: tracks })
      .then(prop('body'))
      .catch(console.error),
  ).pipe(logAndRethrow('Error playing song with Spotify API'))
}

export const playTrack = (accessToken: string, songUri: string, songOffset: number = 0) => {
  return from(
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
      .catch(err => {
        console.error(err.message)
      }),
  )
}
