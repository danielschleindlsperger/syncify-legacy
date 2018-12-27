import * as R from 'ramda'
import { query } from '../../utils/query'
import { JWT_STORAGE_KEY, VALID_UNTIL_STORAGE_KEY } from './constants'

const JWT_QUERY_KEY = 'token'
const ONE_HOUR_IN_SECONDS = 3600

const whenNil = R.when(R.isNil)

const maybeTokenFromQuery = R.pipe(
  query,
  R.prop(JWT_QUERY_KEY),
  R.ifElse(
    R.isNil,
    () => null,
    token => ({
      token,
      validUntil: Math.round(Date.now() / 1000 + ONE_HOUR_IN_SECONDS),
    }),
  ),
)

const maybeTokenFromLocalStorage = () => {
  const token = window.localStorage.getItem(JWT_STORAGE_KEY)
  const validUntil = Number(window.localStorage.getItem(VALID_UNTIL_STORAGE_KEY))
  return token && validUntil
    ? {
        token,
        validUntil,
      }
    : null
}

export const getInitialToken = R.pipe(
  maybeTokenFromQuery,
  whenNil(maybeTokenFromLocalStorage),
  whenNil(() => {
    throw new Error('Could not retrieve a token from query params or local storage.')
  }),
)
