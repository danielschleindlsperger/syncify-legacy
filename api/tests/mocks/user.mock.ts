import * as faker from 'faker'
import * as uuid from 'uuid'
import { getRepository } from 'typeorm'
import { User } from '../../api/user'

const fakeData = (data: Partial<User>): User => ({
  id: uuid.v4(),
  name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  avatar: faker.image.avatar(),
  accessToken: faker.random.alphaNumeric(171),
  refreshToken: faker.random.alphaNumeric(134),
  deviceId: faker.random.alphaNumeric(40),
  ...data,
})

export const mockUser = async (data: Partial<User> = {}) =>
  getRepository('user').save(fakeData(data))
