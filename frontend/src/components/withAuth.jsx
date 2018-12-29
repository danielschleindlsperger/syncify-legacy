import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from '@reach/router'
import { store } from '../store'

const WithAuth = ({ isLoggedIn, children }) =>
  isLoggedIn ? children : <Redirect to="/login" noThrow />

const mapStateToProps = state => ({ isLoggedIn: store.select.auth.isLoggedIn(state) })
export default connect(mapStateToProps)(WithAuth)
