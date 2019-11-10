/**
 * @jest-environment node
 */

import { handler } from './refresh'
import { signToken } from '../jwt'
import Spotify from 'spotify-web-api-node'
import { APIGatewayProxyResult } from 'aws-lambda'
import { createApiGatewayEvent, mockFn } from '../../../utils/test-utils'
import { UserDAO } from '../../users'
import { User } from '../../../../types/user'

jest.mock('../../users', () => ({
  UserDAO: {
    get: jest.fn(),
    save: jest.fn(),
  },
}))

jest.spyOn(Spotify.prototype, 'refreshAccessToken').mockResolvedValue({
  body: {
    access_token: 'access_token',
    expires_in: 3600,
  },
} as any)

jest.spyOn(Spotify.prototype, 'setAccessToken')

const context = {} as any

describe('refresh flow', () => {
  const user = { id: 'id ' }
  const token = signToken(user)

  it('returns "401 unauthorized" when user tries to refresh non valid token', async () => {
    const event = createApiGatewayEvent()
    const response = (await handler(event, context, () => {})) as APIGatewayProxyResult
    expect(response.statusCode).toBe(401)
    expect(JSON.parse(response.body).error).toMatch(/unauthorized/i)
  })

  it('refreshes token for existing user', async () => {
    mockFn(UserDAO.get).mockResolvedValue({
      id: 'id',
      accessToken: 'old_access_token',
      refreshToken: 'refresh_token',
    } as User)

    jest.spyOn(Date, 'now').mockReturnValue(0)

    const event = createApiGatewayEvent({ headers: { authorization: `Bearer ${token}` } })
    const response = (await handler(event, context, () => {})) as APIGatewayProxyResult
    const data = JSON.parse(response.body).data

    expect(response.statusCode).toBe(200)
    expect(data).toStrictEqual({
      expires: expect.any(String),
      bearerToken: expect.any(String),
      spotifyAccessToken: 'access_token',
    })
    expect(new Date(data.expires).getTime()).toBe(3600 * 1000)
  })

  it('token is valid but user cannot be retrieved', async () => {
    mockFn(UserDAO.get).mockResolvedValue(undefined)

    const event = createApiGatewayEvent({ headers: { authorization: `Bearer ${token}` } })
    const response = (await handler(event, context, () => {})) as APIGatewayProxyResult

    expect(response.statusCode).toBe(404)
    expect(JSON.parse(response.body).error).toMatch(/could not find user in database/i)
  })
})
