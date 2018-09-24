import { niceReducer, typedReduce } from '../redux-helpers'
import * as types from './auth-types'

const initialState = {
  authToken: null,
  validUntil: 0, // timestamp in seconds
  user: null,
}

// REDUCERS
const authReducer = niceReducer(initialState, [
  typedReduce(types.SET_AUTH_TOKEN, (state, { authToken }) => ({ ...state, authToken })),
  typedReduce(types.SET_AUTH_TOKEN_VALID_UNTIL, (state, { validUntil }) => ({ ...state, validUntil })),
  typedReduce(types.SET_AUTH_USER, (state, { user }) => ({ ...state, user })),
])

export default authReducer