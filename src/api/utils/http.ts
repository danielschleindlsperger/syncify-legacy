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

export function NotFound(
  message: string = 'Not found.',
  headers: Headers = {},
): APIGatewayProxyResult {
  const body = {
    error: message,
  }

  return {
    headers,
    statusCode: 404,
    body: toJsonString(body),
  }
}

export function ServerError(message: string, headers: Headers = {}): APIGatewayProxyResult {
  return {
    headers,
    statusCode: 500,
    body: message,
  }
}

export function BadRequest(message: string, headers: Headers = {}): APIGatewayProxyResult {
  return {
    headers,
    statusCode: 400,
    body: message,
  }
}
