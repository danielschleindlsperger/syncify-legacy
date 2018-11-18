import { generateToken } from '@marblejs/middleware-jwt'
import { Configuration } from '../../config'
import { generateTokenPayload } from '../../api/auth/helpers'
import { User } from '../../api/user'
import { Plugin, SuperAgentRequest } from 'superagent'

export const authenticatedRequest = (user: User): Plugin => async (req: SuperAgentRequest) => {
  const payload = generateTokenPayload(user)
  const token = generateToken({ secret: Configuration.jwtSecret })(payload)
  req.set('Authorization', `Bearer ${token}`)
}
