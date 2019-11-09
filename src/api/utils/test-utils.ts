import { APIGatewayProxyEvent } from 'aws-lambda'
import { mergeDeepRight } from 'ramda'

const defaultEvent = {
  headers: {},
  body: '',
} as APIGatewayProxyEvent

export const createApiGatewayEvent = (partial: Partial<APIGatewayProxyEvent> = {}) =>
  mergeDeepRight(defaultEvent, partial) as APIGatewayProxyEvent

export function mockFn<T, Y extends any[]>(f: (...args: Y) => T): jest.Mock<T, Y> {
  return f as jest.Mock<T, Y>
}
