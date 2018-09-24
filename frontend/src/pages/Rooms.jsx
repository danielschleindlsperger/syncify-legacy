import React from 'react'
import WithAuth from '../components/withAuth'

const Rooms = () => (
  <WithAuth>
    <div>
      <h1>Hello Rooms</h1>
    </div>
  </WithAuth>
)

export default Rooms