import { Effect } from '@marblejs/core'
import { flatMap, map } from 'rxjs/operators'
import { userDao } from '../model/user.dao'

export const getUserListEffect$: Effect = req$ =>
  req$.pipe(
    flatMap(userDao.allPublic),
    map(users => ({ body: users }))
  )
