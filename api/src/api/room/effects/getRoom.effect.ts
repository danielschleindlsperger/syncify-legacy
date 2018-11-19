import { Effect, use } from '@marblejs/core'
import { flatMap, map } from 'rxjs/operators'
import * as R from 'ramda'
import { fetchRoom } from './helpers/fetch-room'
import { roomIdValidator$ } from './helpers/validate-room'

const omitProtectedProps = R.over(
  R.lensProp('listeners'),
  R.map(R.omit(['accessToken', 'refreshToken', 'updatedAt'])),
)

export const getRoomEffect$: Effect = req$ =>
  req$.pipe(
    use(roomIdValidator$),
    flatMap(fetchRoom),
    // TODO: solving this with database query might be more efficient and safe
    // in any case: test this
    map(omitProtectedProps),
    map(body => ({
      body,
    })),
  )
