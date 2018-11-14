import { Middleware } from '@marblejs/core'
import { validator$, Joi } from '@marblejs/middleware-joi'

export const userValidator$: Middleware = validator$({
  body: Joi.object({
    deviceId: Joi.string().length(40),
  }),
})
