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
          },
        }),
      () => {
        throw new Error('Invalid token passed.')
      },
    ),
  )(accessToken)
