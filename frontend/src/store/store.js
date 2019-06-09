import { init } from '@rematch/core'
import selectPlugin from '@rematch/select'
import createRematchPersist from '@rematch/persist'
import { models } from './models'

const persistPlugin = createRematchPersist({
  whitelist: ['auth'],
  // throttle: 5000,
  version: 1,
  debug: true,
})

export const createStore = () => init({ models, plugins: [selectPlugin(), persistPlugin] })
