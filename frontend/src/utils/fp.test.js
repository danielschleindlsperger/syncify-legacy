import { view, lensProp } from 'ramda'
import { applyAll } from './fp'

describe('applyAll', () => {
  it('applies all functions to input (useful for multiple lenses on the same data structure)', () => {
    const input = { a: 'foo', b: 'bar' }
    const viewA = view(lensProp('a'))
    const viewB = view(lensProp('b'))

    expect(applyAll([viewA, viewB])(input)).toEqual(['foo', 'bar'])
  })
})
