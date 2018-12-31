import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'

// Bind to app node for accessibility http://reactcommunity.org/react-modal/accessibility/
// Also use fallback for storybook since it uses a different root node selector.
Modal.setAppElement(document.querySelector('#app') || document.querySelector('#root'))

const CloseButton = props => (
  <button {...props} style={{ padding: 10, margin: 10, position: 'absolute', top: 0, right: 0 }}>
    X
  </button>
)

// TODO: maybe inline styles are not a good idea?
const style = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: 2000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    position: 'relative',
    top: null,
    right: null,
    bottom: null,
    left: null,
    width: '100%',
    maxWidth: 800,
    height: 'calc(100vh - 80px)',
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: 3,
    outline: 'none',
    padding: '20px',
  },
}

export class StyledModal extends React.Component {
  static propTypes = { defaultOpen: PropTypes.bool, children: PropTypes.func.isRequired }
  static defaultProps = { defaultOpen: false }

  state = { isOpen: this.props.defaultOpen }

  openModal = () => this.setState({ isOpen: true })
  closeModal = () => this.setState({ isOpen: false })

  render() {
    const { children } = this.props
    const { isOpen } = this.state

    const Content = ({ children, ...props }) => (
      <Modal {...props} style={style} isOpen={isOpen} onRequestClose={this.closeModal}>
        <CloseButton onClick={this.closeModal} />
        {children}
      </Modal>
    )

    return children({ openModal: this.openModal, closeModal: this.closeModal, Content })
  }
}
