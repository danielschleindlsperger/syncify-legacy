import { Effect, use, Middleware } from '@marblejs/core'
import { validator$, Joi } from '@marblejs/middleware-joi'
import { flatMap, map } from 'rxjs/operators'
import { roomDao } from '../model'

const roomValidator$: Middleware = validator$({
  body: Joi.object({
    name: Joi.string()
      .min(3)
      .required(),
  }),
})

export const createRoomEffect$: Effect = req$ =>
  req$.pipe(
    use(roomValidator$),
    map(req => req.body),
    flatMap(roomDao.create),
    map(body => ({ body }))
  )
