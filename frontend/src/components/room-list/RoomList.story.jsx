import React from 'react'
import { storiesOf } from '@storybook/react'
import { StyledRoomBlock, RoomList } from '.'
import rooms from './mock-rooms'

const stories = storiesOf('Room', module)

stories.add('Room Blcok', () => <StyledRoomBlock {...rooms[0]} />)

stories.add('RoomList', () => <RoomList rooms={rooms} />)
