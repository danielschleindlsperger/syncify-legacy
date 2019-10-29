import { Resolvers } from '../../__generated__/graphql'
import { Context } from '../../context'
import Spotify from 'spotify-web-api-node'
import { DatabaseUser } from '../users/database-user'
import { signToken, verifyToken } from './jwt'
import cookie from 'cookie'
import { User } from '../users'
import { AuthenticationError } from 'apollo-server'

export const resolvers: Resolvers<Context> = {
  Mutation: {
    authorize: async (_, { code }, context) => {
      const spotify = new Spotify(context.config.spotify)

      if (code) {
        // Retrieve an access token and a refresh token
        const { body } = await spotify.authorizationCodeGrant(code)
        const { expires_in, access_token, refresh_token } = body

        spotify.setAccessToken(access_token)

        const { body: spotifyUser } = await spotify.getMe()

        const avatar = spotifyUser.images && spotifyUser.images[0] && spotifyUser.images[0].url

        const user: DatabaseUser = {
          id: spotifyUser.id,
          name: spotifyUser.display_name,
          avatar,
          accessToken: access_token,
          refreshToken: refresh_token,
        }

        await User.save(context.dynamoClient, user)

        const token = signToken({ id: user.id })
        const expires = new Date(Date.now() + expires_in * 1000)

        const tokenCookie = cookie.serialize('token', token, {
          httpOnly: true,
          expires,
        })

        context.res.setHeader('Set-Cookie', tokenCookie)

        return {
          accessToken: access_token,
          expires: expires.toISOString(),
        }
      }

      if (!context.user) {
        throw new AuthenticationError('Need to be logged in to refresh tokens.')
      }

      spotify.setRefreshToken(context.user.refreshToken)

      const { access_token, expires_in } = await spotify.refreshAccessToken().then(res => res.body)

      await User.save(context.dynamoClient, {
        ...context.user,
        accessToken: access_token,
      })

      const token = signToken({ id: context.user.id })
      const expires = new Date(Date.now() + expires_in * 1000)

      const tokenCookie = cookie.serialize('token', token, {
        httpOnly: true,
        expires,
      })

      context.res.setHeader('Set-Cookie', tokenCookie)

      return {
        accessToken: access_token,
        expires: new Date(Date.now() + 3600 * 1000).toISOString(),
      }
    },
  },
}
