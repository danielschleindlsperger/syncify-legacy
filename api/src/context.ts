import { Request, Response } from 'express'
import { config, Config } from './config'
import { SharedIniFileCredentials } from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { DatabaseUser, User } from './modules/users'
import cookie from 'cookie'
import { verifyToken } from './modules/auth'

export type Context = {
  config: Config
  dynamoClient: DocumentClient
  user?: DatabaseUser
  res: Response
}

export const createContext = async (req: Request, res: Response): Promise<Context> => {
  const credentials = process.env.AWS_ACCESS_KEY_ID
    ? undefined
    : new SharedIniFileCredentials({ profile: 'dev' })

  const dynamoClient = new DocumentClient({ region: 'eu-central-1', credentials })

  const cookies = cookie.parse(req.headers['cookie'] || '')

  const user = cookies.token
    ? await User.get(dynamoClient, verifyToken(cookies.token).id)
    : undefined

  return {
    config,
    dynamoClient,
    user,
    res,
  }
}
