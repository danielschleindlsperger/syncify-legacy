import { Effect, use, Middleware } from '@marblejs/core'
import { validator$, Joi } from '@marblejs/middleware-joi'
import { flatMap, map } from 'rxjs/operators'
import { RoomDAO } from '../model'
import { logAndRethrow } from '../../../util'

const roomValidator$: Middleware = validator$({
  body: Joi.object({
    name: Joi.string()
      .min(3)
      .required(),
    playlist: Joi.array().items(
      Joi.object({
        isActive: Joi.boolean(),
        spotifyUri: Joi.string(),
      }),
    ),
  }),
})

export const createRoomEffect$: Effect = req$ =>
  req$.pipe(
    use(roomValidator$),
    map(req => req.body),
    flatMap(RoomDAO.save),
    map(body => ({ body })),
    logAndRethrow(''),
  )
