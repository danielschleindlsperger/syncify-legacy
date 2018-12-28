import { view, lensPath } from 'ramda'

export const token = view(lensPath(['auth', 'token']))
export const validUntil = view(lensPath(['auth', 'validUntil']))
export const user = view(lensPath(['auth', 'user']))
