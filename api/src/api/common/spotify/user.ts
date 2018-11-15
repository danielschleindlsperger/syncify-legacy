import { from, Observable } from 'rxjs'
import { spotifyFactory, SpotifyUserDto } from './spotify-web-api'
import { prop } from 'ramda'

export const getMe = (accessToken: string): Observable<SpotifyUserDto> =>
  from(
    spotifyFactory({ accessToken })
      .getMe()
      .then(prop('body')),
  )
