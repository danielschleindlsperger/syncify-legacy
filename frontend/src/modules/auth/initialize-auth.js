import * as R from 'ramda'
import { promise } from 'root/utils/promise'
import { setAuth, setUser } from './store'
import { getMe } from '../../api'
import { getInitialToken } from './initial-token'
import { JWT_STORAGE_KEY, VALID_UNTIL_STORAGE_KEY } from './constants'

const persistToken = ({ token, validUntil }) => {
  window.localStorage.setItem(JWT_STORAGE_KEY, token)
  window.localStorage.setItem(VALID_UNTIL_STORAGE_KEY, validUntil)
}

export const initialAuthorization = store =>
  promise(resolve =>
    resolve(
      R.pipe(
        getInitialToken,
        authInfo => store.dispatch(setAuth(authInfo)),
        R.tap(persistToken),
        () => getMe().then(user => store.dispatch(setUser(user))),
      )(),
    ),
  )
