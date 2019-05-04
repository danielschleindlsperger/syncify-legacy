import React from 'react'
import { connect } from 'react-redux'
import { Login } from './Login'
import { store } from '../store'

const WithAuth = ({ isLoggedIn, children }) => (isLoggedIn ? children : <Login />)

const mapStateToProps = state => ({ isLoggedIn: store.select.auth.isLoggedIn(state) })

export default connect(mapStateToProps)(WithAuth)
