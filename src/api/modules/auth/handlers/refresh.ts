import { APIGatewayProxyHandler } from 'aws-lambda'
import Spotify from 'spotify-web-api-node'
import { Ok, Unauthorized, NotFound } from '../../../utils/http'
import { env } from '../../../utils/env'
import { User } from '../../../../types/user'
import { AuthorizeApiResponse } from '../../../../types/api'
import { signToken, getRequestUser } from '../jwt'
import { UserDao } from '../../users'

const spotify = new Spotify({
  clientId: env('SPOTIFY_CLIENT_ID'),
  clientSecret: env('SPOTIFY_CLIENT_SECRET'),
  redirectUri: env('SPOTIFY_REDIRECT_URL'),
})

export const handler: APIGatewayProxyHandler = async (event, context) => {
  // refresh authentication
  const tokenUser = getRequestUser(event)
  if (tokenUser === undefined) return Unauthorized()

  // fetch user from database
  const user = await UserDao.get(tokenUser.id)
  if (!user) return NotFound('Token was valid but could not find user in database.')

  // refresh credentials with spotify
  spotify.setRefreshToken(user.refreshToken)
  const { access_token, expires_in } = await spotify.refreshAccessToken().then(res => res.body)

  // persist user in database
  const updatedUser: User = {
    ...user,
    accessToken: access_token,
  }

  await UserDao.save(updatedUser)

  // return new tokens to user
  const bearerToken = signToken({ id: user.id })

  return Ok<AuthorizeApiResponse>({
    data: {
      bearerToken,
      spotifyAccessToken: access_token,
      expires: new Date(Date.now() + expires_in).toISOString(),
    },
  })
}

exports.handler = handler
