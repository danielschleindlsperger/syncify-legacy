import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda'
import { Ok, NotFound, BadRequest } from '../../../utils/http'
import { RoomDAO } from '../room-dao'
import { RoomApiResponse } from '../../../../types/api'

export const handler: APIGatewayProxyHandler = async (event, context) => {
  const id = getPathParam('id', event)
  if (!id) return BadRequest('URL parameter `id` not found.')

  const room = await RoomDAO.get(id)
  if (!room) return NotFound(`No room found for id "${id}"`)

  return Ok<RoomApiResponse>({ data: room })
}

const getPathParam = (param: string, event: APIGatewayProxyEvent): string | undefined => {
  if (!event.pathParameters) return undefined
  return event.pathParameters[param]
}
