import { httpListener } from '@marblejs/core'
import { bodyParser$ } from '@marblejs/middleware-body'
import { loggerWithOpts$ } from '@marblejs/middleware-logger'
import { Config } from 'syncify-config'
import { api$ } from './api'

const logger$ = loggerWithOpts$({
  silent: false,
  // log everything locally and errors in prod
  filter: res => Config.isDev || res.statusCode >= 400,
})

// disable logger for testing
const middlewares = Config.isTesting ? [bodyParser$] : [logger$, bodyParser$]

const effects = [api$]

export const app = httpListener({ middlewares, effects })
