import { HttpMiddlewareEffect } from '@marblejs/core'
import { validator$, Joi } from '@marblejs/middleware-joi'

export const roomIdValidator$: HttpMiddlewareEffect = validator$({
  params: Joi.object({
    id: Joi.string()
      .min(3)
      .required(),
  }),
})
