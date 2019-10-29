import { ApolloServer } from 'apollo-server'
import * as Auth from './modules/auth'
import * as Rooms from './modules/rooms'
import * as Users from './modules/users'

import baseTypeDefs from './modules/base-schema.graphql'
import { createContext } from './context'
import { IResolvers } from './__generated__/graphql'
import { GraphQLError } from 'graphql'

const cors =
  process.env.NODE_ENV === 'development'
    ? {
        origin: '*',
      }
    : {}

export const server = new ApolloServer({
  cors,
  typeDefs: [baseTypeDefs, Auth.typeDefs, Rooms.typeDefs, Users.typeDefs],
  resolvers: [Rooms.resolvers, Auth.resolvers] as IResolvers[],
  context: ({ req }) => createContext(req),
  formatError: (error: GraphQLError) => {
    console.log(error)
    return error
  },
  // mocks: true,
})
