import gql from 'graphql-tag'

export default gql`
  type User {
    id: ID!
    name: String
    avatar: String
  }
`
