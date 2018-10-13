import { throwError, of } from 'rxjs'
import { isNil } from 'ramda'

export const neverNullable = <T>(data: T) =>
  isNil(data)
    ? throwError(new Error('value was nullable'))
    : of(data as NonNullable<T>)
