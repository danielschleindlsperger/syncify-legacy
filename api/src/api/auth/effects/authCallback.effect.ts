import { Effect } from '@marblejs/core'
import { generateToken } from '@marblejs/middleware-jwt'
import { map, flatMap } from 'rxjs/operators'
import { path } from 'ramda'
import { Config } from '../../../config'
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
        avatar: path(['images', 0, 'url'], spotifyUser),
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
    map(generateToken({ secret: Config.jwtSecret })), // TODO: use cookie instead of query param)
    flatMap(token => req$.pipe(map(req => ({ token, redirectTo: req.query.state })))),
    map(({ token, redirectTo }) => redirect(`${redirectTo}?token=${token}`)),
  )
