import { Resolvers } from '../../__generated__/graphql'
import { Context } from '../../context'

export const resolvers: Resolvers<Context> = {
  Query: {
    getRoom() {
      return null
    },
  },
  Mutation: {
    joinRoom() {
      return null
    },
  },
}
