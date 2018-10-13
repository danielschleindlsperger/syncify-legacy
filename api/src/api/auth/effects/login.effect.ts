import { Effect } from '@marblejs/core'
import { createAuthorizationUrl } from '../spotify-auth'
import { redirectEffect$ } from '../../common/effects/redirect.effect'

export const loginEffect$: Effect = redirectEffect$(createAuthorizationUrl())
