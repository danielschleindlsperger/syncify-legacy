import { Effect } from '@marblejs/core'
import { generateToken } from '@marblejs/middleware-jwt'
import { map, flatMap } from 'rxjs/operators'
import {
  tokensFromOauthCode,
  getMe,
  SpotifyOAuthResponse,
} from '../spotify-auth'
import { User, userDao } from '../../user'
import { neverNullable } from '../../../util'
import { generateTokenPayload } from '../helpers'
import { Configuration } from '../../../config'
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
      })
    )
  )

export const authCallbackEffect$: Effect = req$ =>
  req$.pipe(
    map(req => req.query.code),
    flatMap(neverNullable),
    flatMap((code: string) => tokensFromOauthCode(code)),
    flatMap(userFromSpotifyData),
    flatMap(userDao.create),
    map(generateTokenPayload),
    map(generateToken({ secret: Configuration.jwtSecret })),
    // TODO: use cookie instead of query param
    map(token => redirect(`${Configuration.frontendUrl}?token=${token}`))
  )
