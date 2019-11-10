/**
 * @jest-environment node
 */

import { handler } from './show'
import { createApiGatewayEvent, mockFn } from '../../../utils/test-utils'
import { APIGatewayProxyResult } from 'aws-lambda'
import { RoomDAO } from '../room-dao'
import { Room } from '../../../../types/room'

jest.mock('../room-dao', () => ({
  RoomDAO: {
    get: jest.fn(),
  },
}))

describe('room show.handler', () => {
  const context: any = {}

  it('returns room with matching id', async () => {
    const event = createApiGatewayEvent({
      pathParameters: { id: '1234-5678' },
    })

    mockFn(RoomDAO.get).mockResolvedValue({
      id: '1234-5678',
      name: 'hullebulle',
    } as Room)

    const response = (await handler(event, context, () => {})) as APIGatewayProxyResult

    expect(response.statusCode).toBe(200)
    expect(JSON.parse(response.body).data).toStrictEqual({
      id: '1234-5678',
      name: 'hullebulle',
    })
  })

  it('returns "404 not found when id cannot be found in database"', async () => {
    const event = createApiGatewayEvent({
      pathParameters: { id: '1234-5678' },
    })

    mockFn(RoomDAO.get).mockResolvedValue(undefined)

    const response = (await handler(event, context, () => {})) as APIGatewayProxyResult

    expect(response.statusCode).toBe(404)
  })
})
