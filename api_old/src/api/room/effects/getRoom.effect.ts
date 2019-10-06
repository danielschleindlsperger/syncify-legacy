import { HttpEffect, use } from '@marblejs/core'
import { requestValidator$, t } from '@marblejs/middleware-io'
import { flatMap, map } from 'rxjs/operators'
import * as R from 'ramda'
import { fetchRoom } from './helpers/fetch-room'
import { stringOfLength } from '../../../validation/string-of-length'

const omitProtectedProps = R.over(
  R.lensProp('listeners'),
  R.map(R.omit(['accessToken', 'refreshToken', 'updatedAt'])),
)

export const getRoomParams = t.type({
  id: stringOfLength(3),
})

export const getRoomEffect$: HttpEffect = req$ =>
  req$.pipe(
    use(requestValidator$({ params: getRoomParams })),
    flatMap(fetchRoom), // TODO: solving this with database query might be more efficient and safe
    // in any case: test this
    map(omitProtectedProps),
    map(body => ({ body })),
  )
