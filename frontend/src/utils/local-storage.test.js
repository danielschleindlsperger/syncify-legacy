import { localStorage } from './local-storage'

afterEach(() => {
  window.localStorage.clear()
})

describe('localStorage.get', () => {
  it('returns a value', () => {
    window.localStorage.setItem('key', 'value')
    expect(localStorage.get('key')).toBe('value')
  })
})

describe('localStorage.getNumber', () => {
  it('returns a value and casts to number', () => {
    window.localStorage.setItem('aNumber', 42)
    expect(window.localStorage.getItem('aNumber')).toBe('42')
    expect(localStorage.getNumber('aNumber')).toBe(42)
  })

  it('does not explode when value cannot be cast to number', () => {
    window.localStorage.setItem('notANumber', null)
    expect(localStorage.getNumber('notANumber')).toBe(NaN)
  })
})