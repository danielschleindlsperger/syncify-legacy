import { HttpEffect, use } from '@marblejs/core'
import { t, requestValidator$ } from '@marblejs/middleware-io'
import { flatMap, map, zip } from 'rxjs/operators'
import { UserDAO, User } from '../../user'
import { RoomDAO } from '../model'
import { from, of } from 'rxjs'
import { playTrack } from '../../common/spotify'
import { stringOfLength } from '../../../validation/string-of-length'

const createRoomParams = t.type({
  id: stringOfLength(3),
})

// This endpoint should be deleted and instead handled with a real time connection

export const joinRoomEffect$: HttpEffect = req$ =>
  req$.pipe(
    use(requestValidator$({ params: createRoomParams })),
    flatMap(req => {
      // if supplied id is invalid fuck it (actually we need to validate it at some point)
      const params = req.params as { id: string } // TODO: remove typecast
      const updatedUser: User = {
        ...req.user,
        room: params.id,
      }
      return UserDAO.save(updatedUser).pipe(zip(RoomDAO.findOne(params.id)))
    }),
    map(async ([user, room]) => {
      const currentSong = room.playlist.find(song => song.isActive)
      if (currentSong) {
        let offset = 0
        if (currentSong.playbackStartedAt) {
          offset = Date.now() - currentSong.playbackStartedAt
        }
        return from(
          playTrack(user.accessToken, `spotify:track:${currentSong.id}`, offset, user.deviceId),
        )
      }
      return of(null)
    }),
    map(() => ({ body: { success: true } })),
  )
