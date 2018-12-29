import React from 'react'
import { Link } from '@reach/router'
import { Navbar, NavbarGroup, NavbarItem } from './navigation'
import { Button } from './input'
import { CreateRoom } from './CreateRoom'

export const AppNavbar = () => (
  <Navbar>
    <NavbarItem>
      <a href="/">Syncify</a>
    </NavbarItem>
    <NavbarItem>
      <Link to="/rooms">Find a Room</Link>
    </NavbarItem>
    <NavbarGroup alignRight>
      <NavbarItem>
        <CreateRoom />
      </NavbarItem>
    </NavbarGroup>
  </Navbar>
)
