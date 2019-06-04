import { generateToken } from '@marblejs/middleware-jwt'
import { Config } from '../../src/config'
import { generateTokenPayload } from '../../src/api/auth/helpers'
import { User } from '../../src/api/user'
import { Plugin, SuperAgentRequest } from 'superagent'

export const authenticatedRequest = (user: User): Plugin => async (req: SuperAgentRequest) => {
  const payload = generateTokenPayload(user)
  const token = generateToken({ secret: Config.jwtSecret })(payload)
  req.set('Authorization', `Bearer ${token}`)
}
