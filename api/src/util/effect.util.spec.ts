import { of } from 'rxjs'
import { tap } from 'rxjs/operators'
import { logAndRethrow } from './effect.util'

console.error = jest.fn().mockImplementation(() => {})

afterEach(jest.restoreAllMocks)

test('logAndRethrow logs error with a message and rethrows that same error', done => {
  const error = new Error('a real catastrophe')
  of('a value')
    .pipe(
      tap(() => {
        throw error
      }),
      logAndRethrow('something bad happened')
    )
    .subscribe(
      () => {
        throw new Error('success callback should not be called')
      },
      rethrownErr => {
        expect(rethrownErr).toBe(error)
        expect(console.error).toHaveBeenCalledTimes(1)
        expect(console.error).toHaveBeenCalledWith('something bad happened', error)
        done()
      }
    )
})
