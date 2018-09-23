import * as R from 'ramda'

const noop = () => {}

const get = R.tryCatch(
  key => window.localStorage.getItem(key),
  R.always(null),
)

const set = R.curry((key, value) => R.tryCatch(
  () => { window.localStorage.setItem(key, value) },
  noop,
)())

export const localStorage = {
  get,
  set,
  getNumber: R.pipe(
    get,
    Number,
  ),
}
