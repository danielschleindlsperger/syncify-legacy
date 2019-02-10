import { pipe, prop, ifElse, isNil, allPass } from 'ramda'
import { getMe, refreshAuth } from '../../../api'
import { query } from '../../../utils/query'
import { viewToken } from '../../lenses'

const tokenValid = allPass([auth => auth.token, auth => auth.validUntil > Date.now()])

const JWT_QUERY_KEY = 'token'
const ONE_HOUR_IN_MILLIS = 3600000

const maybeTokenFromQuery = pipe(
  query,
  prop(JWT_QUERY_KEY),
  ifElse(
    isNil,
    () => null,
    token => ({
      token,
      validUntil: Math.round(Date.now() + ONE_HOUR_IN_MILLIS),
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
    async initialToken() {
      const auth = maybeTokenFromQuery()
      if (auth) {
        return dispatch.auth.setAuth(auth)
      }
    },
    async fetchUser(payload, rootState) {
      const token = viewToken(rootState)
      const user = await getMe(token)
      setInterval(
        () => {
          dispatch.auth.refreshToken()
        },
        // refresh tokens every 25 minutes
        1000 * 60 * 25,
        // 1000 * 10,
      )
      return dispatch.auth.setUser(user)
    },
    async refreshToken(payload, rootState) {
      const currentToken = viewToken(rootState)
      const { user, token } = await refreshAuth(currentToken)
      dispatch.auth.setUser(user)
      dispatch.auth.setToken(token)
    },
  }),
}
