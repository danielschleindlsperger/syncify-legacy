import { combineRoutes, EffectFactory } from '@marblejs/core'
import { createRoomEffect$ } from './effects/createRoom.effect'
import { getRoomListEffect$ } from './effects/getRoomList.effect'
export * from './model'
import { authorize$ } from '../auth'

export const createRoom$ = EffectFactory.matchPath('/')
  .matchType('POST')
  .use(createRoomEffect$)

export const getRoomList$ = EffectFactory.matchPath('/')
  .matchType('GET')
  .use(getRoomListEffect$)

export const room$ = combineRoutes('/room', {
  effects: [createRoom$, getRoomList$],
  middlewares: [authorize$],
})
