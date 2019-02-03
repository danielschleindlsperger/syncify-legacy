import { Rabbit } from 'rabbit-queue'
import { RoomDAO } from '../api/room'
import { SCHEDULE_ROOM_SONG_CHANGE, CHANGE_USER_SONG } from './events'
import { playTrack } from '../api/common/spotify'
import { queueNextSongChange, setNextPlaying } from '../api/room/actions'

type RoomSongChangePayload = {
  songId: string
  roomId: string
}

type UserSongChangePayload = {
  accessToken: string
  songId: string
  playbackOffset: number
}

const handleScheduleRoomSongChange = (queue: Rabbit) => {
  queue.createQueue(SCHEDULE_ROOM_SONG_CHANGE, { durable: false }, (msg, ack) => {
    // TODO: validate if this scheduled song change is still the latest one
    const { songId, roomId }: RoomSongChangePayload = JSON.parse(msg.content.toString())

    RoomDAO.findOne(roomId).subscribe(async room => {
      console.log(`Dispatching song change event for room ${roomId} and song ${songId}`)

      room.listeners.forEach(user => {
        const payload: UserSongChangePayload = {
          accessToken: user.accessToken,
          playbackOffset: 0,
          songId,
        }
        queue.publish(CHANGE_USER_SONG, payload)
      })

      const newRoom = setNextPlaying(room)
      RoomDAO.save(newRoom)
      queueNextSongChange(room).catch((err: Error) => {
        console.error(
          `Error queueing next song change for room "${room.name}" with id "${room.id}"`,
          err,
        )
      })
    })
    ack()
  })
}

const handleUserSongChange = (queue: Rabbit) => {
  queue.createQueue(CHANGE_USER_SONG, { durable: false }, (msg, ack) => {
    // TODO: validate if this scheduled song change is still the latest one
    const { accessToken, songId, playbackOffset }: UserSongChangePayload = JSON.parse(
      msg.content.toString(),
    )
    console.log(`Changing song to ${songId} for user with accessToken ${accessToken.slice(0)}`)
    playTrack(accessToken, `spotify:track:${songId}`, playbackOffset)
    ack()
  })
}

const dispatchRoomSongChange = (queue: Rabbit, delay: number, payload: RoomSongChangePayload) => {
  console.log(`queueing song ${payload.songId} for room ${payload.roomId} in ${delay}ms`)
  return queue.publishWithDelay(SCHEDULE_ROOM_SONG_CHANGE, payload, { expiration: delay })
}

const dispatchUserSongChange = (queue: Rabbit, payload: UserSongChangePayload) => {
  return queue.publish(CHANGE_USER_SONG, payload)
}

const registerHandlers = (queue: Rabbit) => {
  handleScheduleRoomSongChange(queue)
  handleUserSongChange(queue)
}

export const Scheduler = { registerHandlers, dispatchRoomSongChange, dispatchUserSongChange }
