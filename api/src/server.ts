import { ApolloServer, IResolvers } from 'apollo-server'
import typeDefs from './schema.graphql'

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
  typeDefs,
  resolvers,
  mocks: true,
})
