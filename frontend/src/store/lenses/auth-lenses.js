import { view, lensPath } from 'ramda'

export const viewToken = view(lensPath(['auth', 'token']))
export const viewValidUntil = view(lensPath(['auth', 'validUntil']))
export const viewUser = view(lensPath(['auth', 'user']))
export const viewAccessToken = view(lensPath(['auth', 'user', 'accessToken']))
