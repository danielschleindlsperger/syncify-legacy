import { Effect, use } from '@marblejs/core'
import { flatMap, map, zip, tap } from 'rxjs/operators'
import { roomIdValidator$ } from './helpers/validate-room'
import { UserDAO, User } from '../../user'
import { RoomDAO } from '../model'
import { Queue } from '../../../connection/queue'
import { Scheduler } from '../../../scheduler'
import { from, of } from 'rxjs'

// This endpoint should be deleted and instead handled with a real time connection

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
    map(async ([user, room]) => {
      console.log('listeners in effect', room.listeners.map(user => user.name))
      const queue = await Queue.get()
      const currentSong = room.playlist.find(song => song.isActive)
      if (currentSong) {
        let offset = 0
        if (currentSong.playbackStartedAt) {
          offset = Date.now() - currentSong.playbackStartedAt
        }
        return from(
          Scheduler.dispatchUserSongChange(queue, {
            accessToken: user.accessToken,
            songId: currentSong.id,
            playbackOffset: offset,
          }),
        )
      }
      return of(null)
    }),
    map(() => ({ body: { success: true } })),
  )
