import { authorize$ as jwt$, VerifyOptions } from '@marblejs/middleware-jwt'
import { flatMap } from 'rxjs/operators'
import { Config } from '../../../config'
import { Payload } from '../helpers/token.helper'
import { UserDAO } from '../../user'
import { neverNullable } from '../../../util'

const jwtConfig: VerifyOptions = { secret: Config.jwtSecret }

export const verifyPayload$ = (payload: Payload) =>
  UserDAO.findByIdSecured(payload._id).pipe(flatMap(neverNullable))

export const authorize$ = jwt$(jwtConfig, verifyPayload$)
