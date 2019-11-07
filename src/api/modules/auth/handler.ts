import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda'
import Spotify from 'spotify-web-api-node'
import { ddb } from '../../clients'
import { Ok, ServerError } from '../../utils/http'
import { env } from '../../utils/env'
import { User } from '../../../types/user'
import { AuthorizeApiResponse } from '../../../types/api'
import { signToken } from './jwt'

const TableName = env('USERS_TABLE_NAME')

const spotify = new Spotify({
  clientId: env('SPOTIFY_CLIENT_ID'),
  clientSecret: env('SPOTIFY_CLIENT_SECRET'),
  redirectUri: env('SPOTIFY_REDIRECT_URL'),
})

export const authorize: APIGatewayProxyHandler = async (event, context) => {
  const body = parseBody(event)
  const code = body && body.code

  if (code) {
    try {
      // trade code for token, "initial" flow
      const codeResponse = await spotify.authorizationCodeGrant(code)

      const { access_token, refresh_token, expires_in } = codeResponse.body
      spotify.setAccessToken(access_token)

      const userResponse = await spotify.getMe()

      const { display_name, id, images } = userResponse.body

      const user: User = {
        id,
        name: display_name || id,
        avatar: images && getImage(images),
        accessToken: access_token,
        refreshToken: refresh_token,
      }

      await ddb
        .put({
          TableName,
          Item: user,
        })
        .promise()

      return Ok<AuthorizeApiResponse>({
        data: {
          spotifyAccessToken: access_token,
          bearerToken: signToken({ id }),
          expires: new Date(Date.now() + expires_in).toISOString(),
        },
      })
    } catch (e) {
      console.log(e)
      return ServerError('Error during authentication with Spotify servers.')
    }
  } else {
    // refresh authentication
    throw new Error('Not Implemented')
  }
}

const parseBody = (event: APIGatewayProxyEvent): Record<string, string> | undefined =>
  event.body ? JSON.parse(event.body) : undefined

const getImage = (images: SpotifyApi.ImageObject[]) => images[0] && images[0].url

exports.authorize = authorize
