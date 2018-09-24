import * as R from 'ramda';
import { query } from '../utils/query'
import { failure } from '../utils/promise'
import { localStorage } from '../utils/local-storage'
import { setFreshAuth, setExistingAuth, setUser } from '../store/auth/action-creators'
import request from '../utils/request'

const JWT_STORAGE_KEY = 'JWT';
const VALID_UNTIL_STORAGE_KEY = 'JWT_VALID_UNTIL';
const JWT_QUERY_KEY = 'token';

const whenNil = f => R.when(R.isNil, f);
const whenNotNil = f => R.unless(R.isNil, f);

const maybeTokenFromQuery = () => R.pipe(
  query,
  R.prop(JWT_QUERY_KEY),
)(window);

const persistToken = ({ authToken, validUntil }) => {
  localStorage.set(JWT_STORAGE_KEY, authToken)
  localStorage.set(VALID_UNTIL_STORAGE_KEY, validUntil)
}

const readTokenFromStorage = () => {
  const authToken = localStorage.get(JWT_STORAGE_KEY)
  const validUntil = localStorage.getNumber(VALID_UNTIL_STORAGE_KEY)
  return (authToken && validUntil) ? { authToken, validUntil } : null
}

const fetchUser = store => () =>
  request(store)
    .get('/api/auth/me')
    .then(R.prop('data'))
    .then(user => store.dispatch(setUser(user)))

export const initialAuthorization = store => R.pipe(
  maybeTokenFromQuery,
  // got token from query, update redux store
  whenNotNil(token => store.dispatch(setFreshAuth(token))),
  // try to get token from localStorage and update redux store with old token
  whenNil(R.pipe(
    readTokenFromStorage,
    whenNotNil((authInfo) => store.dispatch(setExistingAuth(authInfo))),
  )),
  // persist in localstorage
  whenNotNil(R.tap(persistToken)),
  // fetch user
  R.ifElse(
    R.isNil,
    () => failure('Authorization failed. Log in.'),
    fetchUser(store),
  ),
)();
