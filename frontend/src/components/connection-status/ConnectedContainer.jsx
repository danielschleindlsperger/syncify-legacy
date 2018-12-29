import { connect } from 'react-redux'
import { Connected } from './Connected'
import { viewConnected } from '../../store/lenses'

const mapStateToProps = state => ({
  connected: viewConnected(state),
})

export const ConnectedContainer = connect(mapStateToProps)(Connected)
