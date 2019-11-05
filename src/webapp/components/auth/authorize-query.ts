import gql from 'graphql-tag'

export const AUTHORIZE = gql`
  mutation Authorize($code: String) {
    authorize(code: $code) {
      accessToken
      expires
    }
  }
`
