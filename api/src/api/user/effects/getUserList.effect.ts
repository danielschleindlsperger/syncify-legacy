import { Effect } from '@marblejs/core'
import { flatMap, map } from 'rxjs/operators'
import { UserDAO } from '../model/user.dao'

export const getUserListEffect$: Effect = req$ =>
  req$.pipe(
    flatMap(UserDAO.allPublic),
    map(users => ({ body: users })),
  )
