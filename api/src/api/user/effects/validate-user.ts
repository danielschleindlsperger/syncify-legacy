import { HttpMiddlewareEffect } from '@marblejs/core'
import { validator$, Joi } from '@marblejs/middleware-joi'

export const userValidator$: HttpMiddlewareEffect = validator$({
  body: Joi.object({
    deviceId: Joi.string().length(40),
  }),
})
