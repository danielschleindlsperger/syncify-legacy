import { HttpEffect } from '@marblejs/core'
import { flatMap, map } from 'rxjs/operators'
import { UserDAO } from '../model/user.dao'

export const getUserListEffect$: HttpEffect = req$ =>
  req$.pipe(
    flatMap(UserDAO.allPublic),
    map(users => ({ body: users })),
  )
