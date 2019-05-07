import request from 'supertest'
import { app } from '../../../app'
import { mockUser, mockRoom, authenticatedRequest } from '../../../tests/mocks'

test('returns 401 for unauthenticated request', async () => {
  await request(app)
    .get('/api/room')
    .expect(401)
})

test('returns all rooms ordered by descending creation date', async () => {
  const user = await mockUser()
  const rooms = [await mockRoom(), await mockRoom()]

  await request(app)
    .get('/api/room')
    .use(authenticatedRequest(user))
    .expect(200)
    .expect(({ body: res }) => {
      expect(res.length).toBe(2)
      expect(res[0].name).toBe(rooms[1].name)
      expect(res[0].coverArt).toBe(rooms[1].coverArt)
      expect(res[0].playlist).toBeUndefined()
    })
})
