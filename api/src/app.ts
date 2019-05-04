import { httpListener, createContext } from '@marblejs/core'
import { bodyParser$ } from '@marblejs/middleware-body'
import { logger$ } from '@marblejs/middleware-logger'
import { Config } from './config'
import { api$ } from './api'

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
}).run(createContext())
