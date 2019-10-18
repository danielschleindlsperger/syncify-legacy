import { Resolvers } from '../../__generated__/graphql'
import { Context } from '../../context'

export const resolvers: Resolvers<Context> = {
  Mutation: {
    authorize: (_, { code }, ctx) => {
      console.log({ ctx })
      return {
        accessToken: 'accessToken',
        expires: new Date(Date.now() + 3600 * 1000).toISOString(),
      }
    },
  },
}
