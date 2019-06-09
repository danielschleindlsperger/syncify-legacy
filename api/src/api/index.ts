import { combineRoutes } from '@marblejs/core'
import { auth$ } from './auth'
import { user$ } from './user'
import { room$ } from './room'
import { health$ } from './health'
import { pusherWebhook$ } from './pusher-webhooks'

export const api$ = combineRoutes('/api', [auth$, user$, room$, pusherWebhook$, health$])
