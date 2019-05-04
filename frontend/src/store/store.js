import { init } from '@rematch/core'
import selectPlugin from '@rematch/select'
import { models } from './models'

export const createStore = () => init({ models, plugins: [selectPlugin()] })
