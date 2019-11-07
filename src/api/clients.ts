import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { SharedIniFileCredentials } from 'aws-sdk'

// IS_OFFLINE is a special environment variable set by serverless-offline plugin
const credentials =
  process.env.IS_OFFLINE === 'true' ? new SharedIniFileCredentials({ profile: 'dev' }) : undefined

export const ddb = new DocumentClient({ region: 'eu-central-1', credentials })
