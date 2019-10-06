import { HttpEffect, use } from '@marblejs/core'
import { flatMap, map, tap } from 'rxjs/operators'
import { Room, RoomDAO } from '../model'
import { queueNextSongChange } from '../actions'
import { requestValidator$, t } from '@marblejs/middleware-io'
import { stringOfLength } from '../../../validation/string-of-length'
import { User } from '../../user'

const RequestSchema = t.type({
  name: stringOfLength(3),
  playlist: t.array(t.type({ id: t.string, durationMs: t.number })),
  settings: t.type({ loop: t.boolean }),
})

export const createRoomEffect$: HttpEffect = req$ =>
  req$.pipe(
    use(requestValidator$({ body: RequestSchema })),
    // Typecast is only necessary because auth middleware is badly typed
    map(req => req as typeof req & { user: User }),
    map(req => ({
      ...req.body,
      admins: [req.user],
      listeners: [],
      playlist: req.body.playlist.map(song => ({ ...song, isActive: false })),
    })),
    map((room: Room) => ({
      ...room,
      playlist: room.playlist.map(song => ({ ...song, isActive: false })),
    })),
    map((room: Room) => {
      // Maybe make this immutable idk
      room.playlist[0].isActive = true
      room.playlist[0].playbackStartedAt = Date.now()
      return room
    }),
    flatMap(RoomDAO.save),
    tap(async room => {
      queueNextSongChange(room)
    }),
    map(body => ({ body })),
  )
