import { combineRoutes, EffectFactory } from '@marblejs/core'
import { loginEffect$ } from './effects/login.effect'
import { refreshEffect$ } from './effects/refresh.effect'
import { authCallbackEffect$ } from './effects/authCallback.effect'
export * from './middleware'

export const login$ = EffectFactory.matchPath('/login')
  .matchType('GET')
  .use(loginEffect$)

export const refresh$ = EffectFactory.matchPath('/refresh')
  .matchType('POST')
  .use(refreshEffect$)

export const authCallback$ = EffectFactory.matchPath('/callback')
  .matchType('GET')
  .use(authCallbackEffect$)

export const auth$ = combineRoutes('/auth', {
  effects: [login$, refresh$, authCallback$],
})
