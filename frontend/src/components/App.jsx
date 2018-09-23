import React from 'react'
import { ReduxStorePropType } from '../utils/prop-types'
import { Routes } from './Routes'
import { connect, Provider } from 'react-redux'

const App = ({ store }) => (
  <Provider store={store}>
    {/* header or something */}
    <Routes />
    {/* footer or something */}
  </Provider>
)

App.propTypes = {
  store: ReduxStorePropType,
}

export default connect()(App)