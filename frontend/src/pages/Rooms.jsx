import React from 'react'
import { withAuth } from '../components/withAuth'

const Rooms = () => (
  <div>
    <h1>Hello Rooms</h1>
  </div>
)

export default withAuth(Rooms)