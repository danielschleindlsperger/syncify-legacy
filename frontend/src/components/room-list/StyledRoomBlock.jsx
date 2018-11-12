import React from 'react'
import styled from 'styled-components'
import { Link } from '@reach/router'
import PropTypes from 'prop-types'
import { MQ_TABLET, MQ_DESKTOP } from '../style-constants'

const RoomTitle = styled('h2')`
  font-size: 20px;
  font-weight: bold;
  margin-top: 1rem;
`

const ListenersText = styled('span')`
  display: block;
  margin-top: 0.5rem;
`

const ImageOverlay = styled('div')`
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(${({ url }) => url});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  transition: all 0.5s ease;
  transform: scale(1);
  opacity: 0.5;
  filter: grayscale(0.2);
`

ImageOverlay.propTypes = {
  url: PropTypes.string.isRequired,
}

const OverlayText = styled('div')`
  text-align: center;
  position: absolute;
  width: 100%;
  height: auto;
  bottom: 0;
  color: white;
  padding: 10px;
  text-shadow: 3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
`

const RoomBlock = styled('div')`
  width: 50%;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  background-color: black;

  &:after {
    content: '';
    display: block;
    width: 100%;
    padding-bottom: 100%;
  }

  &:hover {
    ${ImageOverlay} {
      transform: scale(1.2);
      opacity: 1;
      filter: grayscale(0);
    }
  }

  @media ${MQ_TABLET} {
    width: 25%;
  }
  @media ${MQ_DESKTOP} {
    width: 20%;
  }
`

export const StyledRoomBlock = ({ id, coverArt, name, listenersCount }) => (
  <RoomBlock>
    <Link to={`/rooms/${id}`}>
      <ImageOverlay url={coverArt} />
      <OverlayText>
        <RoomTitle>{name}</RoomTitle>
        <ListenersText>{listenersCount} listening</ListenersText>
      </OverlayText>
    </Link>
  </RoomBlock>
)

StyledRoomBlock.propTypes = {
  id: PropTypes.string,
  coverArt: PropTypes.string,
  name: PropTypes.string,
  listenersCount: PropTypes.number,
}
