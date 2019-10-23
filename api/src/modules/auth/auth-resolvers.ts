import { Resolvers } from '../../__generated__/graphql'
import { Context } from '../../context'
import Spotify from 'spotify-web-api-node'

export const resolvers: Resolvers<Context> = {
  Mutation: {
    authorize: async (_, { code }, ctx) => {
      const spotify = new Spotify(ctx.config.spotify)

      if (code) {
        // Retrieve an access token and a refresh token
        const { body } = await spotify.authorizationCodeGrant(code)
        const { expires_in, access_token, refresh_token } = body

        return {
          accessToken: access_token,
          expires: new Date(Date.now() + expires_in * 1000).toISOString(),
        }
      }

      // TODO: implement refresh flow
      return {
        accessToken: 'accessToken',
        expires: new Date(Date.now() + 3600 * 1000).toISOString(),
      }
    },
  },
}
