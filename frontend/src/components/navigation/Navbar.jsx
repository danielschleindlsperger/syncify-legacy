import styled from 'styled-components'
import PropTypes from 'prop-types'
import { NAV_HEIGHT } from '../style-constants'

export const Navbar = styled.nav`
  background-color: white;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  height: ${NAV_HEIGHT}px;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

export const NavbarGroup = styled.div`
  margin-left: ${props => (props.alignRight ? 'auto' : null)};
  display: flex;
`

NavbarGroup.propTypes = {
  alignRight: PropTypes.bool,
}

NavbarGroup.defaultProps = {
  alignRight: false,
}

export const NavbarItem = styled.div`
  margin: 0 20px;
  align-self: center;
`
