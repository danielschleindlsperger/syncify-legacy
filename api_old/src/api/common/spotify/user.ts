import { from, Observable } from 'rxjs'
import { spotifyFactory, SpotifyUserDto } from './spotify-web-api'
import { prop } from 'ramda'

export const getMe = (accessToken: string) =>
  from(
    spotifyFactory({ accessToken })
      .getMe()
      .then(prop('body')),
  ) as Observable<SpotifyUserDto>
