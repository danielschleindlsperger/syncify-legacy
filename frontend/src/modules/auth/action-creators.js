import * as types from './auth-types'
import { inOneHourAsSeconds } from 'root/utils/time'

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

export const setUser = user => dispatch => {
  dispatch({ type: types.SET_AUTH_USER, user })
  return user
}