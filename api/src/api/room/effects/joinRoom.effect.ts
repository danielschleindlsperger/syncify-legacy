import { Effect, use } from '@marblejs/core'
import { flatMap, map, zip, tap } from 'rxjs/operators'
import { roomIdValidator$ } from './helpers/validate-room'
import { UserDAO, User } from '../../user'
import { RoomDAO } from '../model'
import { Queue } from '../../../connection/queue'

export const joinRoomEffect$: Effect = req$ =>
  req$.pipe(
    use(roomIdValidator$),
    flatMap(req => {
      // if supplied id is invalid fuck it (actually we need to validate it at some point)
      const updatedUser: User = {
        ...req.user,
        room: req.params.id,
      }
      return UserDAO.save(updatedUser).pipe(zip(RoomDAO.findOne(req.params.id)))
    }),
    tap(([user, room]) => {
      const { id, durationMs } = room.playlist[0]
      Queue.dispatch(
        'change-user-song',
        {
          accessToken: user.accessToken,
          songId: id,
          roomId: room.id,
        },
        0,
      )
    }),
    map(body => ({ body })),
  )
