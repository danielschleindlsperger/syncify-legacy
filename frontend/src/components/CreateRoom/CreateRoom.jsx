import React from 'react'
import { StyledModal } from '../StyledModal'
import { Button } from '../input'

export const CreateRoom = () => (
  <StyledModal>
    {({ openModal, Content }) => (
      <React.Fragment>
        <Button small onClick={() => openModal()}>
          Create a Room
        </Button>
        <Content>
          <h2>Create a Room</h2>
          <label htmlFor="room-name">Name</label>
          <input type="text" id="room-name" />
          <div>Import playlist from Spotify</div>
          <Button>Go!</Button>
        </Content>
      </React.Fragment>
    )}
  </StyledModal>
)
