import React from 'react'
import { storiesOf } from '@storybook/react'
import { Navbar, NavbarGroup, NavbarItem } from './Navbar'
import { Button, ButtonLight } from '../input'

const stories = storiesOf('Navigation', module)

stories.add('Navbar', () => (
  <div>
    <Navbar>
      <NavbarItem>Home</NavbarItem>
      <NavbarItem>Another Link</NavbarItem>
      <NavbarItem>About Us</NavbarItem>
      <NavbarGroup alignRight>
        <NavbarItem>Right aligned</NavbarItem>
        <NavbarItem>
          <Button small>Also right</Button>
        </NavbarItem>
      </NavbarGroup>
    </Navbar>
    <div style={{ height: 2000 }}>Content</div>
  </div>
))
