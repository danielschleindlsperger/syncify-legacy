import { stringOfLength } from './string-of-length'

describe('stringOfLength', () => {
  it('rejects string shorter than min', () => {
    const min3 = stringOfLength(3)
    expect(min3.decode('ab').isLeft()).toBe(true)
  })

  it('rejects strings longer than max', () => {
    const max3 = stringOfLength(0, 3)
    expect(max3.decode('abcd').isLeft()).toBe(true)
  })

  it('accepts all other values', () => {
    const min0Max3 = stringOfLength(0, 3)
    expect(min0Max3.decode('ab').isRight()).toBe(true)
  })
})
