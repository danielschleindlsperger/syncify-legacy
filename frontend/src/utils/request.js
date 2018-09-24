import axios from 'axios'
import * as R from 'ramda'
import { authToken } from '../modules/auth/lenses'

const viewToken = store => R.pipe(
  store => store.getState(),
  R.view(authToken),
)(store)

const request = store => {
  const instance = axios.create({
    headers: { Authorization: `Bearer ${viewToken(store)}`}
  });
  return instance
}

export default request