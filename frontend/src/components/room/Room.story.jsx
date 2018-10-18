import React from 'react'
import { storiesOf } from '@storybook/react'
import { Room, RoomList } from './Room'

const rooms = [
  {
    id: '123123',
    coverArt:
      'https://i.scdn.co/image/736db0f59731686c77fcf21516fee9ac3eeb1c30',
    name: 'Disco Disco Disco',
    listenersCount: 41,
  },
  {
    id: '8588285',
    coverArt:
      'https://i.scdn.co/image/175e97f05b79ed162d3ae54d1b550d7f4a096e88',
    name: 'Work Hard Play Hard',
    listenersCount: 0,
  },
  {
    id: '434893894',
    coverArt:
      'https://i.scdn.co/image/b48dff610a1bc0503049deedac1f57fca0673289',
    name: 'The Glorious Dead',
    listenersCount: 666,
  },
  {
    id: '32531531',
    coverArt:
      'https://i.scdn.co/image/f291759269ef5db5d3aa32f8f752b708ad1a2e7f',
    name: 'Down the Hatch',
    listenersCount: 491,
  },
  {
    id: '1315135135',
    coverArt:
      'https://i.scdn.co/image/00f1b797cf233069db9eec18683cee4a47d95171',
    name: 'Kuschelrock',
    listenersCount: 81,
  },
  {
    id: '4181214124',
    coverArt:
      'https://i.scdn.co/image/29f366d517db08a7fc7ba45f1e431901493f78d6',
    name: 'Small World',
    listenersCount: 613,
  },
  {
    id: 'afds87af87fads78',
    coverArt:
      'https://i.scdn.co/image/736db0f59731686c77fcf21516fee9ac3eeb1c30',
    name: 'Disco Disco Disco',
    listenersCount: 41,
  },
  {
    id: '1235215f2f',
    coverArt:
      'https://i.scdn.co/image/175e97f05b79ed162d3ae54d1b550d7f4a096e88',
    name: 'Work Hard Play Hard',
    listenersCount: 0,
  },
  {
    id: 'asjaoshasgua',
    coverArt:
      'https://i.scdn.co/image/b48dff610a1bc0503049deedac1f57fca0673289',
    name: 'The Glorious Dead',
    listenersCount: 666,
  },
  {
    id: 's98as60g9as',
    coverArt:
      'https://i.scdn.co/image/f291759269ef5db5d3aa32f8f752b708ad1a2e7f',
    name: 'Down the Hatch',
    listenersCount: 491,
  },
  {
    id: 'asgz9as7069g9asg',
    coverArt:
      'https://i.scdn.co/image/00f1b797cf233069db9eec18683cee4a47d95171',
    name: 'Kuschelrock',
    listenersCount: 81,
  },
  {
    id: 'as906dg60sa9gd',
    coverArt:
      'https://i.scdn.co/image/29f366d517db08a7fc7ba45f1e431901493f78d6',
    name: 'Small World',
    listenersCount: 613,
  },
  {
    id: 'asdg098709asdg',
    coverArt:
      'https://i.scdn.co/image/736db0f59731686c77fcf21516fee9ac3eeb1c30',
    name: 'Disco Disco Disco',
    listenersCount: 41,
  },
  {
    id: 'asgd0987as7g',
    coverArt:
      'https://i.scdn.co/image/175e97f05b79ed162d3ae54d1b550d7f4a096e88',
    name: 'Work Hard Play Hard',
    listenersCount: 0,
  },
  {
    id: 'as90g67sa976g',
    coverArt:
      'https://i.scdn.co/image/b48dff610a1bc0503049deedac1f57fca0673289',
    name: 'The Glorious Dead',
    listenersCount: 666,
  },
  {
    id: 'as9d7g66sag',
    coverArt:
      'https://i.scdn.co/image/f291759269ef5db5d3aa32f8f752b708ad1a2e7f',
    name: 'Down the Hatch',
    listenersCount: 491,
  },
  {
    id: 'asdg976as67g',
    coverArt:
      'https://i.scdn.co/image/00f1b797cf233069db9eec18683cee4a47d95171',
    name: 'Kuschelrock',
    listenersCount: 81,
  },
  {
    id: 'asd9786s6adg',
    coverArt:
      'https://i.scdn.co/image/29f366d517db08a7fc7ba45f1e431901493f78d6',
    name: 'Small World',
    listenersCount: 613,
  },
]

const stories = storiesOf('Room', module)

stories.add('Room', () => <Room {...rooms[0]} />)

stories.add('RoomList', () => <RoomList rooms={rooms} />)
