import { use, HttpEffect, HttpRequest, HttpError, HttpStatus } from '@marblejs/core'
import { requestValidator$, t } from '@marblejs/middleware-io'
import { flatMap, map, tap } from 'rxjs/operators'
import { UserDAO } from '../model/user.dao'
import { neverNullable } from '../../../util'
import { User } from '../model'
import { stringOfLength } from '../../../validation/string-of-length'

export const userSchema = t.type({
  deviceId: stringOfLength(40, 40),
})

const mustBeSameUser = (req: HttpRequest) => {
  const params = req.params as { id: string }
  if (params.id !== req.user.id) {
    throw new HttpError(`Can't update another user.`, HttpStatus.FORBIDDEN)
  }
}

export const updateUserEffect$: HttpEffect = req$ =>
  req$.pipe(
    tap(mustBeSameUser),
    use(requestValidator$({ body: userSchema })),
    flatMap(req => {
      const params = req.params as { id: string }
      const body = req.body as User
      return UserDAO.save({ id: params.id, ...body })
    }),
    flatMap(neverNullable),
    map(users => ({ body: users })),
  )
