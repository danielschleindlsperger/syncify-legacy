import { Middleware } from '@marblejs/core'
import { validator$, Joi } from '@marblejs/middleware-joi'

export const roomIdValidator$: Middleware = validator$({
  params: Joi.object({
    id: Joi.string()
      .min(3)
      .required(),
  }),
})
