import { from, Observable } from 'rxjs'
import { prop } from 'ramda'
import { spotifyScopes } from './spotify-scopes'
import { spotifyFactory, SpotifyOAuthResponse } from './spotify-web-api'

export const createAuthorizationUrl = (): string =>
  spotifyFactory().createAuthorizeURL(spotifyScopes)

export const tokensFromOauthCode = (code: string): Observable<SpotifyOAuthResponse> =>
  from(
    spotifyFactory()
      .authorizationCodeGrant(code)
      .then(prop('body')),
  )

export const refreshAccessToken = (refreshToken: string): Observable<string> =>
  from(
    spotifyFactory({ refreshToken })
      .refreshAccessToken()
      .then((res: any): string => res.body.access_token),
  )
