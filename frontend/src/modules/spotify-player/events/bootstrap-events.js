import { handleConnection } from './player-connected'
import { handlePlaybackChange } from './playback'

export const bootstrapEvents = store => player => {
  handleConnection(store)(player)
  handlePlaybackChange(store)(player)
}
