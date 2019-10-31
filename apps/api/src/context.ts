import { Request, Response } from 'express'
import { config, Config } from './config'
import { SharedIniFileCredentials } from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { DatabaseUser, User } from './modules/users'
import cookie from 'cookie'
import { verifyToken } from './modules/auth'
import Spotify from 'spotify-web-api-node'

export type Context = {
  config: Config
  dynamoClient: DocumentClient
  spotify: Spotify
  user?: DatabaseUser
  res: Response
}

export const createContext = async (req: Request, res: Response): Promise<Context> => {
  const dynamoClient = createDynamoDbClient()

  const spotify = new Spotify(config.spotify)

  const cookies = cookie.parse(req.headers['cookie'] || '')

  const user = cookies.token
    ? await User.get(dynamoClient, verifyToken(cookies.token).id)
    : undefined

  return {
    config,
    dynamoClient,
    spotify,
    user,
    res,
  }
}

const createDynamoDbClient = (): DocumentClient => {
  const credentials =
    process.env.STAGE === 'prod' ? undefined : new SharedIniFileCredentials({ profile: 'dev' })

  return new DocumentClient({ region: 'eu-central-1', credentials })
}
