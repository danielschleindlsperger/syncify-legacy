import { Effect, HttpError, HttpStatus } from '@marblejs/core'
import { throwError } from 'rxjs'
import { map, flatMap, catchError, tap } from 'rxjs/operators'
import { neverNullable } from '../../../util'

export const getMeEffect$: Effect = req$ =>
  req$.pipe(
    map(req => req.user),
    flatMap(neverNullable),
    map(user => ({ body: user })),
    catchError(() => throwError(new HttpError('No user logged in.', HttpStatus.UNAUTHORIZED))),
  )
