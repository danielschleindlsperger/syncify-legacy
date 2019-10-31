import gql from 'graphql-tag'

export default gql`
  type AuthorizationResponse {
    accessToken: String!
    """
    ISO-8601 Date String
    """
    expires: String!
  }

  extend type Mutation {
    """
    If supplied, trades Spotify's OAuth \`code\` for a Spotify access token. Also appends a session cookie.

    If no \`code\` is supplied (meaning a refresh), we use the session to refresh the token.
    Behind the scenes we're actually trading for an access AND refresh token.

    https://developer.spotify.com/documentation/general/guides/authorization-guide/#authorization-code-flow
    """
    authorize(code: String): AuthorizationResponse!
  }
`
