import request from 'supertest'
import { app } from '../../../app'
import { mockUser, mockRoom, authenticatedRequest } from '../../../tests/mocks'
import { createContext } from '@marblejs/core'

test('returns 401 for unauthenticated request', async () => {
  const { id } = await mockRoom()
  await request(app.run(createContext()))
    .get(`/api/room/${id}`)
    .expect(401)
})

test('returns a room', async () => {
  const user = await mockUser()
  const room = await mockRoom()

  await request(app.run(createContext()))
    .get(`/api/room/${room.id}`)
    .use(authenticatedRequest(user))
    .expect(200)
    .expect(({ body: res }) => {
      expect(res.id).toBe(room.id)
      expect(res.name).toBe(room.name)
      expect(res.coverArt).toBe(room.coverArt)
      expect(res.listeners.length).toBe(room.listeners.length)
      expect(res.playlist).toEqual(room.playlist)
    })
})

test('returns 404 if no matching id is found', async () => {
  const user = await mockUser()

  await request(app.run(createContext()))
    .get(`/api/room/non-existing-id`)
    .use(authenticatedRequest(user))
    .expect(404)
})
