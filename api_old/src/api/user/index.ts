import { combineRoutes, EffectFactory } from '@marblejs/core'
import { getUserListEffect$ } from './effects/getUserList.effect'
import { getMeEffect$ } from './effects/getMe.effect'
import { updateUserEffect$ } from './effects/updateUser.effect'
export * from './model'
import { authorize$ } from '../auth/middleware' // for some reason importing from auth does not work..

export const getUserList$ = EffectFactory.matchPath('/')
  .matchType('GET')
  .use(getUserListEffect$)

export const getMe$ = EffectFactory.matchPath('/me')
  .matchType('GET')
  .use(getMeEffect$)

export const updateUser$ = EffectFactory.matchPath('/:id')
  .matchType('PATCH')
  .use(updateUserEffect$)

export const user$ = combineRoutes('/user', {
  effects: [getMe$, getUserList$, updateUser$],
  middlewares: [authorize$],
})
