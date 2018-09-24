import * as types from './auth-types'
import { inOneHourAsSeconds } from 'root/utils/time'

// ACTIONS CREATORS
export const setExistingAuth = ({ token, validUntil }) => dispatch => {
  dispatch({ type: types.SET_AUTH_TOKEN, token })
  dispatch({ type: types.SET_AUTH_TOKEN_VALID_UNTIL, validUntil })
  return { token, validUntil }
}

export const setFreshAuth = token => dispatch => {
  dispatch({ type: types.SET_AUTH_TOKEN, token })
  const validUntil = inOneHourAsSeconds(Date.now())
  dispatch({ type: types.SET_AUTH_TOKEN_VALID_UNTIL, validUntil })
  return { token, validUntil }
}

export const setUser = user => dispatch => {
  dispatch({ type: types.SET_AUTH_USER, user })
  return user
}