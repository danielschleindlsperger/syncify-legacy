import { Effect, use, Middleware } from '@marblejs/core'
import { validator$, Joi } from '@marblejs/middleware-joi'
import { flatMap, map, tap } from 'rxjs/operators'
import { Room, RoomDAO } from '../model'
import { logAndRethrow } from '../../../util'
import { Queue } from '../../../connection/queue'
import { Scheduler } from '../../../scheduler'
import { queueNextSongChange } from '../actions'

const roomValidator$: Middleware = validator$({
  body: Joi.object({
    name: Joi.string()
      .min(3)
      .required(),
    playlist: Joi.array().items(
      Joi.object({
        id: Joi.string().required(),
        durationMs: Joi.number(),
      }),
    ),
  }),
})

export const createRoomEffect$: Effect = req$ =>
  req$.pipe(
    use(roomValidator$),
    map(req => ({
      ...req.body,
      admins: [req.user],
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
    logAndRethrow(''),
  )
