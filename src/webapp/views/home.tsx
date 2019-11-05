import React from 'react'
import { Link } from 'react-router-dom'

export const Home = () => (
  <div>
    <h1>Home</h1>
    <p>This will be a room index or marketing page.</p>
    <Link to="/rooms/123">Try /rooms/123</Link>
  </div>
)
