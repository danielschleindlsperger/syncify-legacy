import { neverNullable } from './rxjs.util'

describe('neverNullable', () => {
  it('streams error obervable for nullable value', done => {
    neverNullable(null).subscribe(
      () => {
        throw new Error('success callback should not be triggered')
      },
      error => {
        expect(error.message).toBe('value was nullable')
        done()
      }
    )
  })

  it('acts as identity for non-nullable values', done => {
    neverNullable('a value').subscribe(
      value => {
        expect(value).toBe('a value')
        done()
      },
      error => {
        throw error
      }
    )
  })
})
