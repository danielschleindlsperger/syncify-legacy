import { use, HttpEffect, HttpRequest, HttpError, HttpStatus } from '@marblejs/core'
import { flatMap, map, tap } from 'rxjs/operators'
import { UserDAO } from '../model/user.dao'
import { userValidator$ } from './validate-user'
import { neverNullable } from '../../../util'
import { User } from '../model'

const mustBeSameUser = (req: HttpRequest) => {
  const params = req.params as { id: string }
  if (params.id !== req.user.id) {
    throw new HttpError(`Can't update another user.`, HttpStatus.FORBIDDEN)
  }
}

export const updateUserEffect$: HttpEffect = req$ =>
  req$.pipe(
    tap(mustBeSameUser),
    use(userValidator$),
    flatMap(req => {
      const params = req.params as { id: string }
      const body = req.body as User
      return UserDAO.save({ id: params.id, ...body })
    }),
    flatMap(neverNullable),
    map(users => ({ body: users })),
  )
