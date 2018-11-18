import * as faker from 'faker'
import { getRepository } from 'typeorm'
import { UserDAO, User } from '../../api/user'
import { generateTokenPayload } from '../../api/auth/helpers'

const fakeData = (data): User => ({
  id: faker.random.number(10),
  name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  avatar: faker.image.avatar(),
  accessToken: faker.random.alphaNumeric(171),
  refreshToken: faker.random.alphaNumeric(134),
  deviceId: faker.random.alphaNumeric(40),
  ...data,
})

export const mockUser = async (data = {}) => getRepository('user').save(fakeData(data))
