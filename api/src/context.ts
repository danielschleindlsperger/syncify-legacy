import { Request } from 'express'
import { User } from './__generated__/graphql'
import {} from 'apollo-server'

export type Context = {
  user?: User
}

export const createContext = async (req: Request): Promise<Context> => {
  return {}
}
