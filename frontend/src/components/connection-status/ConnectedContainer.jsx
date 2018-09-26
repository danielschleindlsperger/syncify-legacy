import { connect } from 'react-redux'
import * as R from 'ramda'
import { Connected } from './Connected'

const mapStateToProps = R.pipe(
  R.prop('player'),
  R.pick(['connected']),
)

export const ConnectedContainer = connect(mapStateToProps)(Connected)