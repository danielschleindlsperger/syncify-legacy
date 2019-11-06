import { APIGatewayProxyHandler } from 'aws-lambda'
import { success } from './utils'
import { Room } from '../../types/room'
import { room } from '../../mock-data'

export const handler: APIGatewayProxyHandler = async (event, context) => {
  const id = event.pathParameters && event.pathParameters.id
  return success<Room>(room)
}
