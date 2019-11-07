import { APIGatewayProxyEvent } from 'aws-lambda'

export const createApiGatewayEvent = (partial: Partial<APIGatewayProxyEvent> = {}) => {
  return ({
    ...partial,
  } as unknown) as APIGatewayProxyEvent
}
