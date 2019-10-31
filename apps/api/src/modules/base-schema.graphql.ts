import gql from 'graphql-tag'

export default gql`
  # empty Query and Mutation type because "extend type" does not work on empty or non-existing types

  type Query {
    """
    Unfortunate implementation detail, do not use!
    """
    _placeholder: Int
  }

  type Mutation {
    """
    Unfortunate implementation detail, do not use!
    """
    _placeholder: Int
  }

  type Subscription {
    """
    Unfortunate implementation detail, do not use!
    """
    _placeholder: Int
  }
`
