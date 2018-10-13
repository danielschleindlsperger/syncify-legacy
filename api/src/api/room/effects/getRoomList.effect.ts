import { Effect } from '@marblejs/core'
import { flatMap, map } from 'rxjs/operators'
import { roomDao } from '../model'

export const getRoomListEffect$: Effect = req$ =>
  req$.pipe(
    flatMap(roomDao.all),
    map(body => ({
      body,
    }))
  )
