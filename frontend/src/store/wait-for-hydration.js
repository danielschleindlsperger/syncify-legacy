import { path } from 'ramda'

export const waitForHydration = store =>
  new Promise(resolve => {
    const unsubscribe = store.subscribe(() => {
      const state = store.getState()
      const hydrated = !!path(['_persist', 'rehydrated'])(state)
      if (hydrated) {
        unsubscribe()
        resolve()
      }
    })
  })
