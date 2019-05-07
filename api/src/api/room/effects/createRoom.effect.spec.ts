import request from 'supertest'
import { app } from '../../../app'
import { mockUser, authenticatedRequest } from '../../../tests/mocks'

test('returns 401 for unauthenticated request', async () => {
  await request(app)
    .post('/api/room')
    .expect(401)
})

test('creates and returns a room', async () => {
  const user = await mockUser()
  const requestData = {
    name: 'hello',
    playlist: [
      {
        id: 'spotify:uri',
        durationMs: 123456,
      },
    ],
    settings: {
      loop: false,
    },
  }

  await request(app)
    .post('/api/room')
    .send(requestData)
    .use(authenticatedRequest(user))
    .expect(200)
    .expect(({ body: res }) => {
      expect(res.name).toBe(requestData.name)
      expect(res.playlist).toEqual([
        {
          ...requestData.playlist[0],
          isActive: true,
          playbackStartedAt: expect.any(Number),
        },
      ])
    })
})
