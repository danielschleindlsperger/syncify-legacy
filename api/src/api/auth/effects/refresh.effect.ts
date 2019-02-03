import { Effect, use } from '@marblejs/core'
import { map, flatMap } from 'rxjs/operators'
import { generateToken } from '@marblejs/middleware-jwt'
import { generateTokenPayload } from '../helpers'
import { Config } from '../../../config'
import { User, UserDAO } from '../../user'
import { authorize$ } from '../middleware'
import { refreshAccessToken } from '../../common/spotify'
import { neverNullable } from '../../../util'

export const refreshEffect$: Effect = req$ =>
  req$.pipe(
    use(authorize$),
    flatMap(req => UserDAO.findById(req.user.id)),
    flatMap(neverNullable),
    flatMap((user: User) =>
      refreshAccessToken(user.refreshToken).pipe(
        flatMap((accessToken: string) => {
          user.accessToken = accessToken
          delete user.refreshToken
          return UserDAO.save(user)
        }),
        map(user => ({
          user,
          token: generateToken({ secret: Config.jwtSecret })(generateTokenPayload(user)),
        })),
      ),
    ),
    map(user => ({ body: user })),
  )
