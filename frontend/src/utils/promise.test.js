import { success, failure } from './promise'

const isPromise = x => x && typeof x.then === 'function'

describe('success', () => {
  it('is a promise', () => {
    expect(isPromise(success())).toBe(true)
  })
  it('returns the provided value', async () => {
    expect(await success('a value')).toBe('a value')
  })
})

describe('failure', () => {
  it('is a promise', () => {
    expect(isPromise(failure())).toBe(true)
  })
  it('can be catched', async () => {
    try {
      await failure('an error')
    } catch (e) {
      expect(e).toBe('an error')
    }
  })
})
