import request from 'supertest'
import { app } from '../../../app'

test('login effect redirects to spotify', async () => {
  await request(app)
    .get('/api/auth/login')
    .expect(302)
    .expect('location', /accounts.spotify.com/i)
})
