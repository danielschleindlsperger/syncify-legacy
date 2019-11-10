import jwt from 'jsonwebtoken'
import { APIGatewayProxyEvent } from 'aws-lambda'
import { env } from '../../utils/env'
import { User } from '../../../types/user'

const secret = env('JWT_SECRET')

type JwtUser = Pick<User, 'id'>

export const signToken = (user: JwtUser): string =>
  jwt.sign(
    {
      user,
    },
    secret,
    { expiresIn: '1h' },
  )

export const verifyToken = (token: string) => (jwt.verify(token, secret) as any).user as JwtUser

/**
 * Call this at the start of the handler for  authenticated routes. If it returns `undefined`, the user is not authenticated
 */
export const getRequestUser = (event: APIGatewayProxyEvent): JwtUser | undefined => {
  const authorizationHeader = event.headers['authorization']
  if (!authorizationHeader) return undefined

  const tokenMatch = authorizationHeader.match(/Bearer (.+)/)

  if (tokenMatch === null) return undefined

  return verifyToken(tokenMatch[1])
}
