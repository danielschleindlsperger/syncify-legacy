import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { niceReducer, typedReduce } from './utils/redux'

const initialState = {
  authToken: null,
  validUntil: 0, // timestamp in seconds
}

// Action types
const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN'
const SET_AUTH_TOKEN_VALID_UNTIL = 'SET_AUTH_TOKEN_VALID_UNTIL'

// REDUCERS
export const reducer = niceReducer(initialState, [
  typedReduce(SET_AUTH_TOKEN, (state, { authToken }) => ({ ...state, authToken })),
  typedReduce(SET_AUTH_TOKEN_VALID_UNTIL, (state, { validUntil }) => ({ ...state, validUntil })),
])

// ACTIONS CREATORS
export const setAuthToken = authToken => ({ type: SET_AUTH_TOKEN, authToken })
export const setAuthTokenValidity = () => {
  const validUntil = Math.round((Date.now() / 1000)) + 3600
  return { type: SET_AUTH_TOKEN_VALID_UNTIL, validUntil }
}

export const initStore = (initialState = initialState) =>
  createStore(
    reducer,
    initialState,
    composeWithDevTools(),
  )