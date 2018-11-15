import PropTypes from 'prop-types'

// duck types as a redux store
export const ReduxStorePropType = PropTypes.shape({
  dispatch: PropTypes.func.isRequired,
  getState: PropTypes.func.isRequired,
  subscribe: PropTypes.func.isRequired,
})
