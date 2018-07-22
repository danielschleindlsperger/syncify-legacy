const { wrapMiddleware, promise } = require('./utils')

describe('wrapMiddleware', () => {
  const firstMiddleware = (ctx, next) => {
    ctx.state.test = 'one'
    next()
  }
  const secondMiddleware = (ctx, next) => {
    ctx.state.test += ' two'
    next()
  }

  it('should compose two middlewares', async () => {
    const composed = wrapMiddleware(firstMiddleware, secondMiddleware)
    const ctx = { state: {} }
    await composed(ctx)
    expect(ctx.state.test).toBe('one two')
  })

  it('should be curried to allow wrapped use', async () => {
    const wrapping = wrapMiddleware(firstMiddleware)
    expect(typeof wrapping).toBe('function')
    expect(wrapping.length).toBe(1) // arity = 1

    const complete = wrapping(secondMiddleware)
    const ctx = { state: {} }
    await complete(ctx)
    expect(ctx.state.test).toBe('one two')
  })
})

describe('promise', () => {
  it('accepts a callback function and returns a promise', async () => {
    const isPromise = x => x && typeof x.then === 'function'

    const wait = (resolve) => {
      setTimeout(() => {
        resolve('a value')
      }, 1)
    }

    const result = promise(wait)
    const resolvedResult = await result
    
    expect(isPromise(result)).toBe(true)
    expect(resolvedResult).toBe('a value')
  })
})