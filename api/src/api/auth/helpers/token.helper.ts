import { generateExpirationInHours } from '@marblejs/middleware-jwt'
import { User } from '../../user'

export const generateTokenPayload = (user: User) => ({
  _id: user.id,
  exp: generateExpirationInHours(24),
})

export type Payload = ReturnType<typeof generateTokenPayload>
