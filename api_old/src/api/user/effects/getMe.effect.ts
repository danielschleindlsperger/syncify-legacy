import { HttpEffect, HttpError, HttpStatus } from '@marblejs/core'
import { throwError } from 'rxjs'
import { map, flatMap, catchError } from 'rxjs/operators'
import { neverNullable } from '../../../util'

export const getMeEffect$: HttpEffect = req$ =>
  req$.pipe(
    map(req => req.user),
    flatMap(neverNullable),
    map(user => ({ body: user })),
    catchError(() => throwError(new HttpError('No user logged in.', HttpStatus.UNAUTHORIZED))),
  )
