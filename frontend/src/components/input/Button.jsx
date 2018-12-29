import styled from 'styled-components'
import PropTypes from 'prop-types'
import { COLORS } from '../style-constants'

export const Button = styled.button`
  white-space: nowrap;
  display: inline-block;
  padding: ${props => (props.small ? '5px 10px' : '12px 14px')};
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  font-size: ${props => (props.small ? '14px' : '15px')};
  font-weight: ${props => (props.small ? 500 : 600)};
  text-transform: ${props => (props.small ? 'none' : 'uppercase')};
  letter-spacing: 0.025em;
  text-decoration: none;
  transition: all 0.15s ease;
  background-color: ${COLORS.PRIMARY};
  border: none;
  color: white;
  cursor: pointer;
  &:hover {
    color: ${COLORS.PRIMARY};
    background-color: white;
  }
`

Button.propTypes = {
  small: PropTypes.bool,
}

Button.defaultProps = {
  small: false,
}

export const ButtonLight = styled(Button)`
  background-color: white;
  color: ${COLORS.PRIMARY};
  border: 1px solid ${COLORS.PRIMARY};
  &:hover {
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
    transform: translateY(-1px);
  }
`
