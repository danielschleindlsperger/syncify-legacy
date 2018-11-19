import * as types from './action-types'

// ACTIONS CREATORS
export const setAuth = ({ token, validUntil }) => dispatch => {
  dispatch({ type: types.SET_AUTH_TOKEN, token })
  dispatch({ type: types.SET_AUTH_TOKEN_VALID_UNTIL, validUntil })
  return { token, validUntil }
}

export const setUser = user => dispatch => {
  dispatch({ type: types.SET_AUTH_USER, user })
  return user
}
