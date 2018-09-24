import request from './request'
import { initStore } from '../store'
import { setExistingAuth } from 'root/modules/auth'

const store = initStore()

describe('request', () => {
  it('sets default auth header', () => {
    store.dispatch(setExistingAuth({ token: 'token', validUntil: 12345 }))
    const instance = request(store)
    expect(instance.defaults.headers.Authorization).toBe('Bearer token')
  })
})