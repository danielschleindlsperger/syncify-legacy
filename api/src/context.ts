import { Request } from 'express'
import { User } from './__generated__/graphql'
import { config, Config } from './config'

export type Context = {
  user?: User
  config: Config
}

export const createContext = async (req: Request): Promise<Context> => {
  return {
    config,
  }
}
