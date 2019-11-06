import { APIGatewayProxyHandler } from 'aws-lambda'
import { success, env } from './utils'
import Spotify from 'spotify-web-api-node'
import { ddb } from './clients'

const TableName = env('USERS_TABLE_NAME')

const spotify = new Spotify({
  clientId: env('SPOTIFY_CLIENT_ID'),
  clientSecret: env('SPOTIFY_CLIENT_SECRET'),
  redirectUri: env('SPOTIFY_REDIRECT_URL'),
})

export const handler: APIGatewayProxyHandler = async (event, context) => {
  const blub = await ddb
    .get({
      TableName,
      Key: { id: 'blub' },
    })
    .promise()

  const code = event.queryStringParameters && event.queryStringParameters.code

  const newAlbums = await spotify.getNewReleases()

  return success({ ...newAlbums.body.albums, code })
}
