import { HttpEffect, use, HttpMiddlewareEffect } from '@marblejs/core'
import { validator$, Joi } from '@marblejs/middleware-joi'
import { flatMap, map, tap } from 'rxjs/operators'
import { Room, RoomDAO } from '../model'
import { logAndRethrow } from '../../../util'
import { queueNextSongChange } from '../actions'

const roomValidator$: HttpMiddlewareEffect = validator$({
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
    settings: Joi.object({ loop: Joi.boolean().required() }).required(),
  }),
})

export const createRoomEffect$: HttpEffect = req$ =>
  req$.pipe(
    use(roomValidator$),
    map(req => ({ ...req.body, admins: [req.user] } as Room)),
    map(
      // TODO: remove typecast
      (room: Room) => ({
        ...room,
        playlist: room.playlist.map(song => ({ ...song, isActive: false })),
      }),
    ),
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
