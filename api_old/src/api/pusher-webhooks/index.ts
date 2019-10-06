import { combineRoutes } from '@marblejs/core'
import { pusherPresenceWebhook$ } from './pusher-presence-webhook.effect'

export const pusherWebhook$ = combineRoutes('/pusher-webhook', [pusherPresenceWebhook$])
