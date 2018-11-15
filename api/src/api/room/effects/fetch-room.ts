import { HttpRequest, HttpStatus, HttpError } from '@marblejs/core'
import { pipe, throwError } from 'rxjs'
import { flatMap, catchError } from 'rxjs/operators'
import { roomDao } from '../model'
import { neverNullable } from '../../../util'

export const fetchRoom = pipe(
  (req: HttpRequest) => req.params.id,
  roomDao.findOne,
  flatMap(neverNullable),
  catchError(() => throwError(new HttpError('Room does not exist.', HttpStatus.NOT_FOUND))),
)
