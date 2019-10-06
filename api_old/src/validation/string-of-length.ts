import { string, Type, success, failure } from 'io-ts'

export const stringOfLength = (min: number = 0, max: number = Infinity) =>
  new Type<string, string, unknown>(
    'StringOfLength',
    string.is,
    (u, c) =>
      string.validate(u, c).chain(s => {
        return s.length >= min && s.length <= max
          ? success(s)
          : failure(u, c, `length not between ${min} and ${max}. provided: ${s}`)
      }),
    x => x,
  )
