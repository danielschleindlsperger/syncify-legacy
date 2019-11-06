import { songs } from './mock-songs'
import { Playlist, PlaybackStatus } from '../types/room'

export const playlist: Playlist = {
  currentIndex: 5,
  playbackStatus: PlaybackStatus.Playing,
  currentTimeMs: 102000,
  songs,
}
