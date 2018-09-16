import { interval } from 'rxjs';
import { tap } from 'rxjs/operators';
import R from 'ramda';
import axios from 'axios';
import store from '../store';
import { nowMs } from '../utils';
import { localStorage } from './local-storage';

const JWT_STORAGE_KEY = 'JWT';
const VALID_UNTIL_STORAGE_KEY = 'JWT_VALID_UNTIL';
const JWT_QUERY_KEY = 'token';

const whenNil = f => R.when(R.isNil, f);
const whenNotNil = f => R.unless(R.isNil, f);

export const startRefreshAuthInterval = () =>
  interval(5000)
    .pipe(tap(() => {
      store.dispatch('refreshToken');
    }))
    .subscribe();

const locationHref = R.path(['location', 'href']);

const maybeTokenFromQuery = () => R.pipe(
  locationHref,
  R.split('?'),
  R.last,
  R.split('&'),
  R.map(R.split('=')),
  R.fromPairs,
  R.prop(JWT_QUERY_KEY),
)(window);

const urlWithoutQuery = () => R.pipe(
  locationHref,
  R.split('?'),
  R.head,
)(window);

const resetUrl = R.pipe(
  urlWithoutQuery,
  R.when(Boolean, (url) => {
    window.history.replaceState(null, null, url);
  }),
);

const setAuthTokenHeader = (token) => {
  console.log(token);
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  console.log(axios.defaults.headers.common)
};

const persistToken = R.pipe(
  R.tap(localStorage.set(JWT_STORAGE_KEY)),
  R.tap(() => localStorage.set(VALID_UNTIL_STORAGE_KEY, nowMs())),
);

export const initAuth = () => R.pipe(
  maybeTokenFromQuery,
  whenNotNil(R.tap(persistToken)),
  whenNil(() => localStorage.get(JWT_STORAGE_KEY)),
  // TODO: case when token is in localstorage but stale -> refresh token, but don't login
  whenNotNil(R.pipe(
    R.tap((token) => { store.dispatch('setToken', { token, validUntil: localStorage.getNumber(VALID_UNTIL_STORAGE_KEY) }); }),
    R.tap(() => { store.dispatch('setUser'); }),
    R.tap(setAuthTokenHeader),
    R.tap(resetUrl),
    R.tap(startRefreshAuthInterval),
  )),
)();
