import { Resolvers } from '../../__generated__/graphql'

export const resolvers: Resolvers = {
  Mutation: {
    authorize: (_, { code }) => {
      return {
        accessToken: 'accessToken',
        expires: new Date(Date.now() + 3600 * 1000).toISOString(),
      }
    },
  },
}
