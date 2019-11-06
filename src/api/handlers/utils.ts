import { APIGatewayProxyResult } from 'aws-lambda'

const isDev = process.env.IS_OFFLINE === 'true'

type Headers = Record<string, boolean | number | string>

export function success<T extends unknown>(body: T, headers: Headers = {}): APIGatewayProxyResult {
  return {
    headers,
    statusCode: 200,
    body: isDev ? JSON.stringify(body, null, 2) : JSON.stringify(body),
  }
}

// For performance reasons this should be only executed once at a setup stage, not during regularly executed code
export function env(variableName: string) {
  const envVar = process.env[variableName]
  if (!envVar) throw new Error(`Environment variable ${variableName} is not defined`)
  return envVar
}
