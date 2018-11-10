import styled from 'styled-components'
import PropTypes from 'prop-types'

// TODO: animate progress bar: calculate remaining duration and start a transition
// TODO: add an active? prop to stop animation

export const ProgressBar = styled.div`
  height: 3px;
  width: ${p => (p.position / p.duration) * 100}%;
  background-color: lightskyblue;
  position: absolute;
  top: 100%;
`

ProgressBar.propTypes = {
  duration: PropTypes.number.isRequired,
  position: PropTypes.number.isRequired,
}
