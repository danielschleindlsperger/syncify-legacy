import { combineRoutes } from '@marblejs/core'
import { auth$ } from './auth'
import { user$ } from './user'
import { room$ } from './room'

export const api$ = combineRoutes('/api', [auth$, user$, room$])
