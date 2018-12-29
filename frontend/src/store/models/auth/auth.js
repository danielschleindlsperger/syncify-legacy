import { pipe, prop, ifElse, isNil, allPass } from 'ramda'
import { query } from '../../../utils/query'

const tokenValid = allPass([auth => auth.token, auth => auth.validUntil > Date.now()])

const JWT_QUERY_KEY = 'token'
const ONE_HOUR_IN_SECONDS = 3600

const maybeTokenFromQuery = pipe(
  query,
  prop(JWT_QUERY_KEY),
  ifElse(
    isNil,
    () => null,
    token => ({
      token,
      validUntil: Math.round(Date.now() / 1000 + ONE_HOUR_IN_SECONDS),
    }),
  ),
)

export const auth = {
  state: {
    token: null,
    validUntil: 0, // timestamp in seconds
    user: null,
  },
  reducers: {
    setToken(state, token) {
      return { ...state, token }
    },
    setTokenValidUntil(state, validUntil) {
      return { ...state, validUntil }
    },
    setAuth(state, auth) {
      const { token, validUntil } = auth
      return { ...state, token, validUntil }
    },
    setUser(state, user) {
      return { ...state, user }
    },
  },
  selectors: slice => ({
    isLoggedIn() {
      return slice(tokenValid)
    },
  }),
  effects: dispatch => ({
    async initialToken(payload, rootState) {
      const auth = maybeTokenFromQuery()
      if (auth) {
        dispatch.auth.setAuth(auth)
        return
      }
    },
  }),
}
