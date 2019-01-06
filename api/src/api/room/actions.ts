import { findIndex, pipe, over, lensIndex, assoc, dissoc } from 'ramda'

import { Room } from './model'
import { Queue } from '../../connection/queue'
import { Scheduler } from '../../scheduler'

export const queueNextSongChange = async (room: Room) => {
  const roomId = room.id as string // cast because we're sure id exists after creation
  const currentSong = currentlyPlaying(room)
  const nextSong = nextPlaying(room)
  if (currentSong && nextSong) {
    const { id: songId } = nextSong
    const { durationMs: delay } = currentSong
    const queue = await Queue.get()
    Scheduler.dispatchRoomSongChange(queue, delay, { roomId, songId })
  }
}

const currentlyPlaying = (room: Room) => room.playlist.find(song => song.isActive)
const nextPlaying = (room: Room) => {
  const currentSongIndex = findIndex(song => song.isActive, room.playlist)
  return currentSongIndex !== -1 ? room.playlist[currentSongIndex + 1] : undefined
}

export const setNextPlaying = (room: Room) => {
  const currentSongIndex = findIndex(song => song.isActive, room.playlist)
  const hasNextSong = room.playlist.length > currentSongIndex + 2

  room.playlist[currentSongIndex].isActive = false
  delete room.playlist[currentSongIndex].playbackStartedAt

  if (hasNextSong) {
    room.playlist[currentSongIndex + 1].isActive = true
    room.playlist[currentSongIndex + 1].playbackStartedAt = Date.now()
  }

  return room
}
