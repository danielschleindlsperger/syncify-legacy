import { niceReducer, typedReduce } from './redux-helpers'
import { createStore } from 'redux'

describe('niceReducer', () => {
  let store
  beforeEach(() => {
    const counterState = { count: 0 }
    const countReducer = niceReducer(counterState, [
      typedReduce('INC_COUNT', ({ count }) => ({ count: count + 1 })),
      typedReduce('DEC_COUNT', ({ count }) => ({ count: count - 1 })),
    ])
    store = createStore(countReducer)
  })

  it('runs matching actions', () => {
    expect(store.getState().count).toBe(0)
    store.dispatch({ type: 'INC_COUNT' })
    expect(store.getState().count).toBe(1)
  })

  it('returns default state when action does not match', () => {
    expect(store.getState().count).toBe(0)
    store.dispatch({ type: 'NONSENSICAL ACTION' })
    expect(store.getState().count).toBe(0)
  })
})