import * as R from 'ramda'

export const success = value => new Promise(resolve => resolve(value))
export const failure = error => new Promise((res, reject) => reject(error))
export const promise = R.construct(Promise)
