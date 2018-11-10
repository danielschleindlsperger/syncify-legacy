import { Effect, use } from '@marblejs/core'
import { flatMap, map } from 'rxjs/operators'
import { roomIdValidator$ } from './validate-room'
import { userDao, User } from '../../user'

export const joinRoomEffect$: Effect = req$ =>
  req$.pipe(
    use(roomIdValidator$),
    flatMap(req => {
      // if supplied id is invalid fuck it
      const updatedUser: User = {
        ...req.user,
        room: req.params.id,
      }
      return userDao.save(updatedUser)
    }),
    map(body => ({
      body,
    }))
  )
