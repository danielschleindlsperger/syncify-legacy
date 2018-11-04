import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { StyledRoomBlock } from './StyledRoomBlock'

const StyledRoomList = styled('div')`
  position: relative;
  display: flex;
  flex-wrap: wrap;
`

export const RoomList = ({ rooms, ...props }) => (
  <StyledRoomList {...props}>
    {rooms.map(room => (
      <StyledRoomBlock key={room.id} {...room} />
    ))}
  </StyledRoomList>
)

RoomList.propTypes = {
  rooms: PropTypes.arrayOf(PropTypes.shape(StyledRoomBlock.propTypes)),
}

RoomList.defaultProps = {
  rooms: [],
}
