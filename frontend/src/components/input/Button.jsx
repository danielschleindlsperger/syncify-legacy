import styled from 'styled-components'
import PropTypes from 'prop-types'
import { COLORS, DROP_SHADOWS } from '../style-constants'

export const Button = styled.button`
  white-space: nowrap;
  display: inline-block;
  padding: ${props => (props.small ? '5px 10px' : '12px 14px')};
  box-shadow: ${DROP_SHADOWS.SMALL.normal};
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
  /* TODO: make disabled button look nice */
  &:disabled {
    background-color: gainsboro;
    color: white;
    &:hover {
      background-color: gainsboro;
      color: white;
    }
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
    box-shadow: ${DROP_SHADOWS.SMALL.elevated};
    transform: translateY(-1px);
  }
`
