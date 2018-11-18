import { use, Effect, HttpRequest } from '@marblejs/core'
import { flatMap, map } from 'rxjs/operators'
import { pick } from 'ramda'
import { UserDAO } from '../model/user.dao'
import { userValidator$ } from './validate-user'

const getUserProps = (req: HttpRequest) => ({
  id: req.user.id,
  ...pick(['deviceId'])(req.body),
})

export const updateUserEffect$: Effect = req$ =>
  req$.pipe(
    use(userValidator$),
    map(getUserProps),
    flatMap(UserDAO.save),
    map(users => ({ body: users })),
  )
