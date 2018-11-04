import axios from 'axios'
import {
  pipe,
  unless,
  view,
  ifElse,
  isNil,
} from 'ramda'
import {
  authToken
} from '../modules/auth/lenses'

const viewToken = store => pipe(
  unless(isNil, store => store.getState()),
  view(authToken),
)(store)

export const authenticatedRequest = () => pipe(
  viewToken,
  ifElse(
    isNil,
    () => {
      throw new Error('Could not retrieve token from store')
    },
    token => axios.create({
      headers: {
        Authorization: `Bearer ${token}`
      }
    }))
)(store)

let store = null

export const initApi = x => {
  store = x
}
