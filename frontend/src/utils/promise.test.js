import { success, failure, promise } from './promise'

describe('success', () => {
  it('is a promise', () => {
    expect(typeof success().then).toBe('function')
  })
  it('returns the provided value', async () => {
    expect(await success('a value')).toBe('a value')
  })
})

describe('failure', () => {
  it('is a promise', () => {
    expect(typeof failure().then).toBe('function')
  })
  it('can be catched', async () => {
    try {
      await failure('an error')
    } catch (e) {
      expect(e).toBe('an error')
    }
  })
})