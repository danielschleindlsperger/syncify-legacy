import { httpListener } from '@marblejs/core'
import { bodyParser$ } from '@marblejs/middleware-body'
import { loggerWithOpts$ } from '@marblejs/middleware-logger'
import { Configuration } from './config'
import { api$ } from './api'

const logger$ = loggerWithOpts$({
  silent: false,
  // log everything locally and errors in prod
  filter: res => Configuration.isDev || res.statusCode >= 400,
})

// disable logger for testing
const middlewares = Configuration.isTesting ? [bodyParser$] : [logger$, bodyParser$]

const effects = [api$]

export const app = httpListener({ middlewares, effects })
