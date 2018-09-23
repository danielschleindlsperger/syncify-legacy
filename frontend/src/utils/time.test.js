import { millisToSeconds, inOneHourAsSeconds } from './time'

describe('millisToSeconds', () => {
  it('divides by a thousand and rounds', () => {
    const millis = 12345678 // usually Date.now()
    expect(millisToSeconds(millis)).toBe(12346)
  })
})

describe('inOneHourAsSeconds', () => {
  it('runs millisToSeconds and adds one hour', () => {
    const dateNow = 10000000 // usually Date.now()
    expect(inOneHourAsSeconds(dateNow)).toBe(13600)
  })
})