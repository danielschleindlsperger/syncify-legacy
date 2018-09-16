import R from 'ramda';

// eslint-disable-next-line
export const nowMs = () => R.pipe(
  R.divide(R.__, 1000),
  Math.floor,
)(Date.now());
