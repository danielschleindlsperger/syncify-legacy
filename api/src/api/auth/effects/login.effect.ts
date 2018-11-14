import { Effect } from '@marblejs/core'
import { createAuthorizationUrl } from '../../common/spotify'
import { redirectEffect$ } from '../../common/effects/redirect.effect'

export const loginEffect$: Effect = redirectEffect$(createAuthorizationUrl())
