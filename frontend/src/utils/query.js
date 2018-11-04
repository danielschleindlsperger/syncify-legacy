import * as R from 'ramda'

// :: Object -> String
const locationHref = () => R.path(['location', 'href'])(window);

// :: Array -> Boolean
const lessThanTwoLong = R.pipe(R.length, R.lt(R.__, 2))

// :: Array -> Array
const handleMissingQueryDelimiter = R.when(
  lessThanTwoLong,
  R.always(['', ''])
)

// Reads query parameters from window.location and returns as
// key/value inside a POJO. Does not handle Arrays.
export const query = R.pipe(
  locationHref,
  R.split('?'),
  handleMissingQueryDelimiter,
  R.last,
  R.split('&'),
  R.reject(R.isEmpty), // filter out empty strings as object keys
  R.map(R.split('=')),
  R.fromPairs,
);
