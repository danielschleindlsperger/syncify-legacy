import { init } from '@rematch/core'
import createRematchPersist from '@rematch/persist'
import selectPlugin from '@rematch/select'
import { models } from './models'

const persistPlugin = createRematchPersist({
  version: 2,
  key: 'syncify',
  blacklist: [
    // `Connected` and `deviceId` values would potentially be wrong if we used the persisted values.
    'spotifyPlayer',
  ],
})

export const createStore = () => init({ models, plugins: [selectPlugin(), persistPlugin] })
