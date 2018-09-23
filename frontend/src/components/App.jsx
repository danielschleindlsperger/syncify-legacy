import React from 'react'
import { Routes } from './Routes'
import { connect, Provider } from 'react-redux'

const App = ({ store }) => (
  <Provider store={store}>
    {/* header or something */}
    <Routes />
    {/* footer or something */}
  </Provider>
)

export default connect()(App)