import { niceReducer, typedReduce } from './redux-helpers'
import { inOneHourAsSeconds } from '../utils/time'

const initialState = {
  authToken: null,
  validUntil: 0, // timestamp in seconds
}

// Action types
const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN'
const SET_AUTH_TOKEN_VALID_UNTIL = 'SET_AUTH_TOKEN_VALID_UNTIL'

// ACTIONS CREATORS
export const setAuthToken = authToken => dispatch => {
  dispatch({ type: SET_AUTH_TOKEN, authToken })
  const validUntil = inOneHourAsSeconds(Date.now())
  dispatch({ type: SET_AUTH_TOKEN_VALID_UNTIL, validUntil })
}

// REDUCERS
const authReducer = niceReducer(initialState, [
  typedReduce(SET_AUTH_TOKEN, (state, { authToken }) => ({ ...state, authToken })),
  typedReduce(SET_AUTH_TOKEN_VALID_UNTIL, (state, { validUntil }) => ({ ...state, validUntil })),
])

export default authReducer