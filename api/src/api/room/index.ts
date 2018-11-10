import { combineRoutes, EffectFactory } from '@marblejs/core'
import { createRoomEffect$ } from './effects/createRoom.effect'
import { getRoomEffect$ } from './effects/getRoom.effect'
import { getRoomListEffect$ } from './effects/getRoomList.effect'
import { joinRoomEffect$ } from './effects/joinRoom.effect'
export * from './model'
import { authorize$ } from '../auth'

export const createRoom$ = EffectFactory.matchPath('/')
  .matchType('POST')
  .use(createRoomEffect$)

export const getRoom$ = EffectFactory.matchPath('/:id')
  .matchType('GET')
  .use(getRoomEffect$)

export const joinRoom$ = EffectFactory.matchPath('/:id/join')
  .matchType('GET')
  .use(joinRoomEffect$)

export const getRoomList$ = EffectFactory.matchPath('/')
  .matchType('GET')
  .use(getRoomListEffect$)

export const room$ = combineRoutes('/room', {
  effects: [createRoom$, getRoom$, joinRoom$, getRoomList$],
  middlewares: [authorize$],
})
