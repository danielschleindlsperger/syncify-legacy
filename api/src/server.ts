import { ApolloServer, IResolvers } from 'apollo-server'
import typeDefs from '../../schema/schema.graphql'

const cors =
  process.env.NODE_ENV === 'development'
    ? {
        origin: '*',
      }
    : {}

const rooms = []

const resolvers: IResolvers = {
  Query: {
    getRoom: (_, { id }) => {
      console.log({ id })
      return rooms.find(room => room.id === id) || null
    },
  },
}

export const server = new ApolloServer({
  cors,
  typeDefs,
  resolvers,
  mocks: true,
})
