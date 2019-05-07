import request from 'supertest'
import { app } from '../../../app'
import { mockUser, authenticatedRequest } from '../../../tests/mocks'

test('returns 401 for unauthenticated request', async () => {
  await request(app)
    .get('/api/user/me')
    .expect(401)
})

test('returns the logged in user', async () => {
  const user = await mockUser()

  await request(app)
    .get('/api/user/me')
    .use(authenticatedRequest(user))
    .expect(200)
    .expect(({ body: res }) => {
      expect(res.id).toEqual(user.id)
      expect(res.name).toEqual(user.name)
      expect(res.accessToken).toEqual(user.accessToken)
      expect(res.avatar).toEqual(user.avatar)
      expect(res).not.toHaveProperty('refreshToken')
    })
})
