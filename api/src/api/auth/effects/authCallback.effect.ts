import { Effect } from '@marblejs/core'
import { generateToken } from '@marblejs/middleware-jwt'
import { map, flatMap } from 'rxjs/operators'
import { Config } from 'syncify-config'
import { tokensFromOauthCode, getMe, SpotifyOAuthResponse } from '../../common/spotify'
import { User, UserDAO } from '../../user'
import { neverNullable, logAndRethrow } from '../../../util'
import { generateTokenPayload } from '../helpers'
import { redirect } from '../../common/effects'

const userFromSpotifyData = (tokens: SpotifyOAuthResponse) =>
  getMe(tokens.access_token).pipe(
    map(
      (spotifyUser): User => ({
        id: spotifyUser.id,
        name: spotifyUser.display_name,
        avatar: spotifyUser.images[0].url,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
      }),
    ),
  )

export const authCallbackEffect$: Effect = req$ =>
  req$.pipe(
    map(req => req.query.code),
    flatMap(neverNullable),
    flatMap((code: string) => tokensFromOauthCode(code)),
    flatMap(userFromSpotifyData),
    logAndRethrow('Error fetching user from spotify'),
    flatMap(UserDAO.save),
    map(generateTokenPayload),
    map(generateToken({ secret: Config.jwtSecret })), // TODO: use cookie instead of query param
    map(token => redirect(`${Config.appUrl}?token=${token}`)),
  )
