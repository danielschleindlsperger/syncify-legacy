import { Effect, use, Middleware } from '@marblejs/core'
import { validator$, Joi } from '@marblejs/middleware-joi'
import { flatMap, map, tap } from 'rxjs/operators'
import { RoomDAO } from '../model'
import { logAndRethrow } from '../../../util'

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
    flatMap(RoomDAO.save),
    map(body => ({ body })),
    logAndRethrow(''),
  )
