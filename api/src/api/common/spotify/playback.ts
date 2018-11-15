import { from, Observable } from 'rxjs'
import { prop } from 'ramda'
import { spotifyFactory } from './spotify-web-api'
import { logAndRethrow } from '../../../util'

export const playTracks = (accessToken: string) => (tracks: string[]): Observable<any> =>
  from(
    spotifyFactory({ accessToken })
      .play({ uris: tracks })
      .then(prop('body')),
  ).pipe(logAndRethrow('Error playing song with Spotify API'))
