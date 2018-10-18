import React from 'react'
import { storiesOf } from '@storybook/react'
import { Room, RoomList } from './Room'
import rooms from './mock-rooms'

const stories = storiesOf('Room', module)

stories.add('Room', () => <Room {...rooms[0]} />)

stories.add('RoomList', () => <RoomList rooms={rooms} />)
