import request from 'supertest'
import { app } from '../../../app'
import { mockUser, authenticatedRequest } from '../../../../tests/mocks'
import { createContext } from '@marblejs/core'

test('returns 401 for unauthenticated request', async () => {
  await request(app.run(createContext()))
    .get('/api/user')
    .expect(401)
})

test('returns list of users', async () => {
  const users = [await mockUser(), await mockUser(), await mockUser()]

  await request(app.run(createContext()))
    .get('/api/user')
    .use(authenticatedRequest(users[0]))
    .expect(200)
    .expect(({ body: res }) => {
      expect(res.length).toBe(3)
      expect(res[0]).not.toHaveProperty('accessToken')
      expect(res[0]).not.toHaveProperty('refreshToken')
      expect(res[0]).not.toHaveProperty('updatedAt')
    })
})
