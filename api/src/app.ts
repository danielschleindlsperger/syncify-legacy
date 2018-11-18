import { httpListener } from '@marblejs/core'
import { bodyParser$ } from '@marblejs/middleware-body'
import { logger$ } from '@marblejs/middleware-logger'
import { Configuration } from './config'
import { api$ } from './api'

// disable logger for testing
const middlewares = Configuration.isTesting ? [bodyParser$] : [logger$, bodyParser$]

const effects = [api$]

export const app = httpListener({ middlewares, effects })
