import { from, Observable } from 'rxjs'
import { prop } from 'ramda'
import { spotifyScopes } from './spotify-scopes'
import { spotifyFactory, SpotifyOAuthResponse } from './spotify-web-api'

// @ts-ignore

export const createAuthorizationUrl = (redirectTo: string): string =>
  spotifyFactory().createAuthorizeURL(spotifyScopes, redirectTo)

export const tokensFromOauthCode = (code: string) =>
  from(
    spotifyFactory()
      .authorizationCodeGrant(code)
      .then(prop('body')),
  ) as Observable<SpotifyOAuthResponse>

export const refreshAccessToken = (refreshToken: string) =>
  from(
    spotifyFactory({
      refreshToken,
    })
      .refreshAccessToken()
      .then((res: any): string => res.body.access_token),
  ) as Observable<string>
