import { APIGatewayProxyHandler } from 'aws-lambda'
import { Ok } from '../../../utils/http'
import { Room } from '../../../../types/room'
import { room as mockRoom } from '../../../../mock-data'

export const handler: APIGatewayProxyHandler = async (event, context) => {
  const id = event.pathParameters && event.pathParameters.id
  return Ok<Room>(mockRoom)
}
