import { niceReducer, typedReduce } from '../../../utils/redux-helpers'
import * as types from './action-types'

const initialState = {
  token: null,
  validUntil: 0, // timestamp in seconds
  user: null,
}

// REDUCERS
export const authReducer = niceReducer(initialState, [
  typedReduce(types.SET_AUTH_TOKEN, (state, { token }) => ({ ...state, token })),
  typedReduce(types.SET_AUTH_TOKEN_VALID_UNTIL, (state, { validUntil }) => ({
    ...state,
    validUntil,
  })),
  typedReduce(types.SET_AUTH_USER, (state, { user }) => ({ ...state, user })),
])
