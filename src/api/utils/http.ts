import { APIGatewayProxyResult } from 'aws-lambda'

const formatNicely = process.env.IS_OFFLINE === 'true' || process.env.NODE_ENV === 'test'

type Headers = Record<string, boolean | number | string>

const toJsonString = (body: any) =>
  formatNicely ? JSON.stringify(body, null, 2) : JSON.stringify(body)

export function Ok<T extends unknown>(body: T, headers: Headers = {}): APIGatewayProxyResult {
  return {
    headers,
    statusCode: 200,
    body: toJsonString(body),
  }
}

export const NotFound = (message: string = 'Not found.', headers: Headers = {}) =>
  errorResponse(404, message, headers)

export const ServerError = (message: string = 'Server error.', headers: Headers = {}) =>
  errorResponse(500, message, headers)

export const BadRequest = (message: string = 'Bad request.', headers: Headers = {}) =>
  errorResponse(400, message, headers)

export const Unauthorized = (message: string = 'Unauthorized.', headers: Headers = {}) =>
  errorResponse(401, message, headers)

function errorResponse(
  statusCode: number,
  message: string,
  headers: Headers = {},
): APIGatewayProxyResult {
  const body = {
    error: message,
  }

  return {
    headers,
    statusCode,
    body: toJsonString(body),
  }
}
