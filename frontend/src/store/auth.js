import { niceReducer, typedReduce } from './redux-helpers'
import { inOneHourAsSeconds } from '../utils/time'

const initialState = {
  authToken: null,
  validUntil: 0, // timestamp in seconds
}

// Action types
const types = {
  SET_AUTH_TOKEN: 'SET_AUTH_TOKEN',
  SET_AUTH_TOKEN_VALID_UNTIL: 'SET_AUTH_TOKEN_VALID_UNTIL',
}

// ACTIONS CREATORS
export const setExistingAuth = ({ authToken, validUntil }) => dispatch => {
  dispatch({ type: types.SET_AUTH_TOKEN, authToken })
  dispatch({ type: types.SET_AUTH_TOKEN_VALID_UNTIL, validUntil })
  return { authToken, validUntil }
}

export const setFreshAuth = authToken => dispatch => {
  dispatch({ type: types.SET_AUTH_TOKEN, authToken })
  const validUntil = inOneHourAsSeconds(Date.now())
  dispatch({ type: types.SET_AUTH_TOKEN_VALID_UNTIL, validUntil })
  return { authToken, validUntil }
}

// REDUCERS
const authReducer = niceReducer(initialState, [
  typedReduce(types.SET_AUTH_TOKEN, (state, { authToken }) => ({ ...state, authToken })),
  typedReduce(types.SET_AUTH_TOKEN_VALID_UNTIL, (state, { validUntil }) => ({ ...state, validUntil })),
])

export default authReducer