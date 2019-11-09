/**
 * @jest-environment node
 */

import { signToken, getRequestUser } from './jwt'
import { createApiGatewayEvent } from '../../utils/test-utils'

describe('getRequestUser()', () => {
  const user = { id: 'some-id ' }
  const token = signToken(user)

  it('returns decrypted user from token', () => {
    const event = createApiGatewayEvent({ headers: { authorization: `Bearer ${token}` } })
    expect(getRequestUser(event)).toStrictEqual(user)
  })

  it('returns undefined when `Authorization` header is missing', () => {
    const event = createApiGatewayEvent({ headers: {} })
    expect(getRequestUser(event)).toBeUndefined()
  })

  it('returns undefined when Authorization header is malformed', () => {
    const event = createApiGatewayEvent({ headers: { authorization: 'blabe blub' } })
    expect(getRequestUser(event)).toBeUndefined()
  })
})
