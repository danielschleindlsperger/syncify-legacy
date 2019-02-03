import { generateToken } from '@marblejs/middleware-jwt'
import { Config } from '../../config'
import { generateTokenPayload } from '../../api/auth/helpers'
import { User } from '../../api/user'
import { Plugin, SuperAgentRequest } from 'superagent'

export const authenticatedRequest = (user: User): Plugin => async (req: SuperAgentRequest) => {
  const payload = generateTokenPayload(user)
  const token = generateToken({ secret: Config.jwtSecret })(payload)
  req.set('Authorization', `Bearer ${token}`)
}
