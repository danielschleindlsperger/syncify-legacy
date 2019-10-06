import request from 'supertest'
import { getRepository } from 'typeorm'
import { of } from 'rxjs'
import { app } from '../../../app'
import * as spotify from '../../common/spotify'
import { mockUser, mockRoom, authenticatedRequest } from '../../../../tests/mocks'
import { User } from '../../user'
import { createContext } from '@marblejs/core'

jest.spyOn(spotify, 'playTracks').mockImplementation(() => () => of('asdf'))

afterAll(jest.restoreAllMocks)

test('returns 401 for unauthenticated request', async () => {
  const room = await mockRoom()
  await request(app.run(createContext()))
    .get(`/api/room/${room.id}/join`)
    .expect(401)
})

test('sets room id on user entity', async () => {
  const user = await mockUser()
  const room = await mockRoom()

  await request(app.run(createContext()))
    .get(`/api/room/${room.id}/join`)
    .use(authenticatedRequest(user))
    .expect(200)

  const updatedUser = (await getRepository('user').findOneOrFail({
    id: user.id,
    relations: ['room'],
  })) as User

  expect(updatedUser.room).toBeDefined()
  expect(updatedUser.room).toHaveProperty('id', room.id)
})
