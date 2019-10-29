import jwt from 'jsonwebtoken'
import { User } from '../../__generated__/graphql'

const secret = process.env.JWT_SECRET as string

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
