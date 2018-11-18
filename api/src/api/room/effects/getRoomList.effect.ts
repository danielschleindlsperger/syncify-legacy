import { Effect } from '@marblejs/core'
import { flatMap, map } from 'rxjs/operators'
import { RoomDAO } from '../model'

export const getRoomListEffect$: Effect = req$ =>
  req$.pipe(
    flatMap(RoomDAO.all),
    map(body => ({
      body,
    })),
  )
