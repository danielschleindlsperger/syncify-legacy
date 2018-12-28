import { init } from '@rematch/core'
import createRematchPersist from '@rematch/persist'
import selectPlugin from '@rematch/select'
import { models } from './models'

// const persistPlugin = createRematchPersist({
//   version: 1,
//   key: 'syncify'
// })

export const createStore = () => init({ models, plugins: [selectPlugin()] })

export const store = createStore()
