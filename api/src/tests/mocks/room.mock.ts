import * as faker from 'faker'
import { getRepository } from 'typeorm'
import { Room } from '../../api/room'

const albumCovers = [
  'https://i.scdn.co/image/736db0f59731686c77fcf21516fee9ac3eeb1c30',
  'https://i.scdn.co/image/175e97f05b79ed162d3ae54d1b550d7f4a096e88',
  'https://i.scdn.co/image/b48dff610a1bc0503049deedac1f57fca0673289',
  'https://i.scdn.co/image/f291759269ef5db5d3aa32f8f752b708ad1a2e7f',
  'https://i.scdn.co/image/00f1b797cf233069db9eec18683cee4a47d95171',
  'https://i.scdn.co/image/29f366d517db08a7fc7ba45f1e431901493f78d6',
]

export const fakeData = (data = {}): Room => ({
  id: faker.random.uuid(),
  name: faker.random.words(3),
  coverArt: faker.random.arrayElement(albumCovers),
  playlist: [],
  listeners: [],
  ...data,
})

export const mockRoom = async (data = {}) => getRepository('room').save(fakeData(data))
