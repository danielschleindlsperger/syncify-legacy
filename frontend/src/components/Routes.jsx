import React from 'react'
import { Router, Redirect } from '@reach/router'

// pages
import Rooms from '../pages/Rooms'
import Error from '../pages/Error'
import Login from '../pages/Login'

export const Routes = () => (
  <Router>
    <Redirect from="/" to="/rooms" noThrow />
    <Rooms path="/rooms" />
    <Login path="/login" />
    <Error path="*" code="404" message="Oh noes :(" />
  </Router>
)