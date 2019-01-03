// THis is gonna be a queue library
import { Rabbit } from 'rabbit-queue'
import { findIndex } from 'ramda'
import { Queue } from '../connection/queue'
import { playTracks } from '../api/common/spotify'
import { RoomDAO } from '../api/room'

export const Scheduler = {
  run: async () => {
    const queue = await Queue.connect()
    // initQueues(queue)
  },
}

const initQueues = (queue: Rabbit) => {
  queue
    .createQueue('change-user-song', { durable: false }, (msg, ack) => {
      const { accessToken, songId, roomId } = JSON.parse(msg.content.toString())

      // dispatch current song change
      const spotifyUri = `spotify:track:${songId}`
      playTracks(accessToken)([spotifyUri]).subscribe(() => ack())

      // schedule next song change
      RoomDAO.findOne(roomId).subscribe(room => {
        const { playlist } = room
        const currentSongIndex = findIndex(song => song.id === songId, playlist)
        if (!playlist || playlist.length < currentSongIndex) return
        const { durationMs: delay } = playlist[currentSongIndex]
        const { id } = playlist[currentSongIndex + 1]
        Queue.dispatch(
          'change-user-song',
          { accessToken: accessToken, songId: id, roomId: room.id },
          delay,
        )
      })
    })
    .then(() => console.log('queue created'))
}
