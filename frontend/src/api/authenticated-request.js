import axios from 'axios'
import { pipe, ifElse } from 'ramda'

export const authenticatedRequest = accessToken =>
  pipe(
    ifElse(
      token => Boolean(token),
      token =>
        axios.create({
          headers: {
            Authorization: `Bearer ${token}`,
            // default is 'application/json;charset=utf-8' which some backend libraries cannot parse (e.g. node's is-type)
            'Content-Type': 'application/json',
          },
        }),
      () => {
        throw new Error('Invalid token passed.')
      },
    ),
  )(accessToken)
