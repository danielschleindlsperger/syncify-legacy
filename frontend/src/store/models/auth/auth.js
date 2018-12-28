import { allPass } from 'ramda'

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
    tokenValid() {
      return slice(allPass([auth => auth.token, auth => auth.validUntil > Date.now()]))
    },
  }),
}
