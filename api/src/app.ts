import { httpListener, createServer, bindTo } from '@marblejs/core'
import { bodyParser$ } from '@marblejs/middleware-body'
import { logger$ } from '@marblejs/middleware-logger'
import { Config } from './config'
import { api$ } from './api'
import { pusher, pusherToken } from './pusher'

export const port = Number(process.env.PORT || 3000)

const log$ = logger$({
  silent: false,
  // log everything locally and errors in prod
  filter: res => Config.isDev || res.statusCode >= 400,
})

// disable logger for testing
const middlewares = Config.isTesting ? [bodyParser$()] : [log$, bodyParser$()]

const effects = [api$]

export const app = httpListener({
  middlewares,
  effects,
})

export const server = createServer({
  port,
  hostname: 'localhost',
  httpListener: app,
  dependencies: [bindTo(pusherToken)(pusher)],
})
