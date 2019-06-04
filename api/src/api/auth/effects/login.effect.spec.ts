import request from 'supertest'
import { app } from '../../../app'
import { createContext } from '@marblejs/core'

test('login effect redirects to spotify', async () => {
  await request(app.run(createContext()))
    .get('/api/auth/login')
    .expect(200)
    .expect('location', /accounts.spotify.com/i)
})
