import { when, isNil } from 'ramda'

export const neverNil = (what: string) =>
  when(isNil, () => {
    throw new Error(`${what} was nil.`)
  })
