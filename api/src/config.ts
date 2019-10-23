export type Config = typeof config

// TODO: validate and throw?
export const config = {
  appUrl: process.env.APP_URL,
  graphqlUrl: process.env.GRAPHQL_URL,
  spotify: {
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.SPOTIFY_REDIRECT_URL,
  },
}
