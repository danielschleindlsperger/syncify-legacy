import * as R from 'ramda'

// Usually you would provide Date.now() and get back a timestamp in seconds
// :: Int -> Int
export const millisToSeconds = millis => R.pipe(
  R.divide(R.__, 1000),
  Math.round,
)(millis)

export const addOneHourInSeconds = R.add(3600)

// Provide Date.now() timestamp and get back timestamp
// for one hour in the future in seconds.
// :: Int -> Int
export const inOneHourAsSeconds = dateNow => R.pipe(
  millisToSeconds,
  addOneHourInSeconds,
)(dateNow)