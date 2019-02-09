import React from 'react'
import { Router, Redirect } from '@reach/router'

// pages
import Room from '../pages/Room'
import Rooms from '../pages/Rooms'
import Error from '../pages/Error'

export const Routes = () => (
  <Router>
    <Redirect from="/" to="/rooms" noThrow />
    <Room path="/rooms/:roomId" />
    <Rooms path="/rooms" />
    <Error path="*" code="404" message="Oh noes :(" />
  </Router>
)
