import { authorize$ as jwt$, VerifyOptions } from '@marblejs/middleware-jwt'
import { flatMap } from 'rxjs/operators'
import { Payload } from '../helpers/token.helper'
import { userDao } from '../../user'
import { Configuration } from '../../../config'
import { neverNullable } from '../../../util'

const jwtConfig: VerifyOptions = { secret: Configuration.jwtSecret }

export const verifyPayload$ = (payload: Payload) =>
  userDao.findByIdSecured(payload._id).pipe(flatMap(neverNullable))

export const authorize$ = jwt$(jwtConfig, verifyPayload$)
