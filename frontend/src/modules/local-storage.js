import * as R from 'ramda';

const noop = () => {};

const get = R.tryCatch(
  key => window.localStorage.getItem(key),
  R.always(null),
);

export const localStorage = {
  get,
  set: R.curry((key, value) => R.tryCatch(
    () => { window.localStorage.setItem(key, value); },
    noop,
  )()),
  getNumber: R.pipe(
    get,
    R.unless(
      R.isNil,
      Number,
    ),
  ),
};
