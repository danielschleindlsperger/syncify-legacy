import * as request from 'supertest'
import { app } from '../../../app'
import { mockUser, mockRoom, authenticatedRequest } from '../../../tests/mocks'

test('returns 401 for unauthenticated request', async () => {
  const { id } = await mockRoom()
  await request(app)
    .get(`/api/room/${id}`)
    .expect(401)
})

test('returns a room', async () => {
  const user = await mockUser()
  const room = await mockRoom()

  await request(app)
    .get(`/api/room/${room.id}`)
    .use(authenticatedRequest(user))
    .expect(200)
    .expect(({ body: res }) => {
      expect(res.id).toBe(room.id)
      expect(res.name).toBe(room.name)
      expect(res.coverArt).toBe(room.coverArt)
      expect(res.listeners).toEqual(room.listeners)
      expect(res.playlist).toEqual(room.playlist)
    })
})
