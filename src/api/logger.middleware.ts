import { Request, Response } from 'express'

// TODO: inject Nest's Logger

export function httpLogger(req: Request, res: Response, next: Function) {
  const start = Date.now()
  next()
  console.log(
    `${req.method.toUpperCase()} ${req.path} - ${res.statusCode} - ${Date.now() - start}ms`,
  )
}
