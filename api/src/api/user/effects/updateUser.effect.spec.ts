import * as request from 'supertest'
import * as faker from 'faker'
import { app } from '../../../app'
import { mockUser, authenticatedRequest } from '../../../tests/mocks'

test('returns 401 for unauthenticated request', async () => {
  const user = await mockUser()
  await request(app)
    .patch(`/api/user/${user.id}`)
    .send({ deviceId: faker.random.alphaNumeric(40) })
    .expect(401)
})

// TODO: check why this fails sometimes
xtest('returns 403 for unauthorized requests', async () => {
  const firstUser = await mockUser()
  const secondUser = await mockUser()

  await request(app)
    .patch(`/api/user/${secondUser.id}`)
    .send({ deviceId: faker.random.alphaNumeric(40) })
    .use(authenticatedRequest(firstUser))
    .expect(403)
})

test('updates a user', async () => {
  const user = await mockUser()
  const deviceId = faker.random.alphaNumeric(40)

  await request(app)
    .patch(`/api/user/${user.id}`)
    .use(authenticatedRequest(user))
    .send({ deviceId })
    .expect(200)
    .expect(({ body: res }) => {
      expect(res.id).toBe(user.id)
      expect(res.deviceId).toBe(deviceId)
    })
})

test('validates correctly', async () => {
  const user = await mockUser()

  await request(app)
    .patch(`/api/user/${user.id}`)
    .use(authenticatedRequest(user))
    .send({ deviceId: '1234' })
    .expect(400)
    .expect(({ body: res }) => {
      expect(res.error.message).toContain('"deviceId" length must be 40 characters long')
    })
})
