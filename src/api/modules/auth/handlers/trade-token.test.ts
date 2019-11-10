/**
 * @jest-environment node
 */

import { handler } from './trade-token'
import Spotify from 'spotify-web-api-node'
import { APIGatewayProxyResult } from 'aws-lambda'
import { createApiGatewayEvent } from '../../../utils/test-utils'
import { UserDAO } from '../../users'

jest.mock('../jwt')

jest.mock('../../users', () => ({
  UserDAO: {
    save: jest.fn(),
  },
}))

jest.spyOn(Spotify.prototype, 'authorizationCodeGrant').mockResolvedValue({
  body: {
    access_token: 'access_token',
    refresh_token: 'refresh_token',
    expires_in: 3600,
  },
} as any)

jest.spyOn(Spotify.prototype, 'getMe').mockResolvedValue({
  body: {
    display_name: 'display_name',
    id: 'id',
  },
} as any)

jest.spyOn(Spotify.prototype, 'setAccessToken')

describe('handler.authorize', () => {
  const context = {} as any
  it('trades user token for spotify credentials, fetches user data, persists user, generates token and returns tokens', async () => {
    const event = createApiGatewayEvent({
      body: JSON.stringify({ code: 'SPOTIFY_CODE' }),
    })
    const response = (await handler(event, context, () => {})) as APIGatewayProxyResult
    const data = JSON.parse(response.body).data

    expect(response.statusCode).toBe(200)
    expect(data.spotifyAccessToken).toBe('access_token')
    expect(data.bearerToken).toBe('TOKEN')

    expect(Spotify.prototype.setAccessToken).toHaveBeenCalledWith('access_token')
    expect(UserDAO.save).toHaveBeenCalledWith({
      id: 'id',
      name: 'display_name',
      accessToken: 'access_token',
      refreshToken: 'refresh_token',
    })
  })

  it('returns "400 bad request" when code is missing', async () => {
    const event = createApiGatewayEvent()
    const response = (await handler(event, context, () => {})) as APIGatewayProxyResult

    expect(response.statusCode).toBe(400)
  })
})
