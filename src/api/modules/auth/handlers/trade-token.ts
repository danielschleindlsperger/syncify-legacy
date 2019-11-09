import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda'
import Spotify from 'spotify-web-api-node'
import { Ok, ServerError, BadRequest } from '../../../utils/http'
import { env } from '../../../utils/env'
import { User } from '../../../../types/user'
import { AuthorizeApiResponse } from '../../../../types/api'
import { signToken } from '../jwt'
import { UserDao } from '../../users'

const spotify = new Spotify({
  clientId: env('SPOTIFY_CLIENT_ID'),
  clientSecret: env('SPOTIFY_CLIENT_SECRET'),
  redirectUri: env('SPOTIFY_REDIRECT_URL'),
})

export const handler: APIGatewayProxyHandler = async (event, context) => {
  const body = parseBody(event)
  const code = body && body.code

  if (!code) return BadRequest('Parameter `code` is missing.')

  try {
    // trade code for token, "initial" flow
    const codeResponse = await spotify.authorizationCodeGrant(code)

    const { access_token, refresh_token, expires_in } = codeResponse.body
    spotify.setAccessToken(access_token)

    const { display_name, id, images } = await spotify.getMe().then(res => res.body)

    const user: User = {
      id,
      name: display_name || id,
      avatar: images && getImage(images),
      accessToken: access_token,
      refreshToken: refresh_token,
    }

    await UserDao.save(user)

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
}

const parseBody = (event: APIGatewayProxyEvent): Record<string, string> | undefined =>
  event.body ? JSON.parse(event.body) : undefined

const getImage = (images: SpotifyApi.ImageObject[]) => images[0] && images[0].url

exports.handler = handler
