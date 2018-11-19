import { use, Effect, HttpRequest, HttpError, HttpStatus } from '@marblejs/core'
import { flatMap, map, tap } from 'rxjs/operators'
import { pick, pipe, unless } from 'ramda'
import { UserDAO } from '../model/user.dao'
import { userValidator$ } from './validate-user'
import { neverNullable } from '../../../util'

const mustBeSameUser = (req: HttpRequest) => {
  if (req.params.id !== req.user.id) {
    throw new HttpError(`Can't update another user.`, HttpStatus.FORBIDDEN)
  }
}

export const updateUserEffect$: Effect = req$ =>
  req$.pipe(
    tap(mustBeSameUser),
    use(userValidator$),
    flatMap(req =>
      UserDAO.save({
        id: req.params.id,
        ...req.body,
      }),
    ),
    flatMap(neverNullable),
    map(users => ({ body: users })),
  )
