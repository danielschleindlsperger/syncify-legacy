import { Effect, HttpError, HttpStatus } from '@marblejs/core'
import { throwError } from 'rxjs'
import { map, flatMap, catchError } from 'rxjs/operators'
import { neverNullable } from '../../../util'

export const getMeEffect$: Effect = req$ =>
  req$.pipe(
    map(req => req.user),
    flatMap(neverNullable),
    map(user => ({ body: user })),
    catchError(() => throwError(new HttpError('User does not exist', HttpStatus.NOT_FOUND))),
  )
