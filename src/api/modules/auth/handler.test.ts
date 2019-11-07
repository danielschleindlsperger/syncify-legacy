/**
 * @jest-environment node
 */

import { authorize } from './handler'
import { signToken } from './jwt'
import Spotify from 'spotify-web-api-node'
import { APIGatewayProxyResult } from 'aws-lambda'
import { ddb } from '../../clients'
import { createApiGatewayEvent } from '../../utils/test-utils'

jest.mock('./jwt', () => ({
  signToken: jest.fn(() => 'TOKEN'),
  verifyToken: jest.fn().mockReturnValue({ id: 'ID' }),
}))

jest.mock('../../clients', () => ({
  ddb: {
    put: jest.fn(() => ({
      promise: () => Promise.resolve(),
    })),
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
  describe('initial flow', () => {
    it('trades user token for spotify credentials, fetches user data, persists user, generates token and returns tokens', async () => {
      const event = createApiGatewayEvent({
        body: JSON.stringify({ code: 'SPOTIFY_CODE' }),
      })
      const context = {} as any
      const response = (await authorize(event, context, () => {})) as APIGatewayProxyResult
      const data = JSON.parse(response.body).data

      expect(response.statusCode).toBe(200)
      expect(data.spotifyAccessToken).toBe('access_token')
      expect(data.bearerToken).toBe('TOKEN')

      expect(Spotify.prototype.setAccessToken).toHaveBeenCalledWith('access_token')
      expect(ddb.put).toHaveBeenCalledWith({
        TableName: expect.any(String),
        Item: {
          id: 'id',
          name: 'display_name',
          accessToken: 'access_token',
          refreshToken: 'refresh_token',
        },
      })
    })
  })
})
