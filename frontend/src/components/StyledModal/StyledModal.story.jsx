import React from 'react'
import { storiesOf } from '@storybook/react'
import { StyledModal } from './StyledModal'

const stories = storiesOf('Modal', module)
stories.add('Standard', () => (
  <div>
    <StyledModal defaultOpen={false} shouldCloseOnOverlayClick={true}>
      {({ openModal, Content }) => (
        <React.Fragment>
          <button onClick={() => openModal()}>Open Modal</button>
          <Content>
            <h1>Hello Modal!</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti voluptatibus minima
              fugiat, tempore hic blanditiis commodi atque harum deserunt explicabo?
            </p>
            <div style={{ height: 500, backgroundColor: 'lightgrey', margin: 20 }} />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti voluptatibus minima
              fugiat, tempore hic blanditiis commodi atque harum deserunt explicabo?
            </p>
            <div style={{ height: 500, backgroundColor: 'lightgrey', margin: 20 }} />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti voluptatibus minima
              fugiat, tempore hic blanditiis commodi atque harum deserunt explicabo?
            </p>
            <div style={{ height: 500, backgroundColor: 'lightgrey', margin: 20 }} />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti voluptatibus minima
              fugiat, tempore hic blanditiis commodi atque harum deserunt explicabo?
            </p>
          </Content>
        </React.Fragment>
      )}
    </StyledModal>
  </div>
))
