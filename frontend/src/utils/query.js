import * as R from 'ramda'

// :: Object -> String
const locationHref = R.path(['location', 'href']);

// Reads query parameters from window.location and returns as key/value
// :: window -> Object
export const query = definitelyNotWindow => R.pipe(
  locationHref,
  R.split('?'),
  R.last,
  R.split('&'),
  R.map(R.split('=')),
  R.fromPairs,
)(definitelyNotWindow);