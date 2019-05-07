import { RoomDAO } from '../api/room'
import { playTrack } from '../api/common/spotify'
import { queueNextSongChange, setNextPlaying } from '../api/room/actions'
import Bull from 'bull'
import { Config } from '../config'

type RoomSongChangePayload = {
  songId: string
  roomId: string
}

const roomSongChangeQueue = new Bull<RoomSongChangePayload>('room-song-change', Config.redisUrl)

roomSongChangeQueue.process(({ data: { songId, roomId } }) => {
  RoomDAO.findOne(roomId).subscribe(async room => {
    console.log(`Dispatching song change event for room ${roomId} and song ${songId}`)

    room.listeners.forEach(user => {
      console.log(
        `Changing song to ${songId} for user with accessToken ${user.accessToken.slice(0)}`,
      )
      playTrack(user.accessToken, `spotify:track:${songId}`, 0, user.deviceId)
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
})

const dispatchRoomSongChange = (payload: RoomSongChangePayload, delay: number) => {
  console.log(`queueing song ${payload.songId} for room ${payload.roomId} in ${delay}ms`)
  return roomSongChangeQueue.add(payload, { delay })
}

export const Scheduler = { dispatchRoomSongChange }
