import React from 'react'
import ReactDOM from 'react-dom'

const HelloMessage = ({ name }) => <h1>Hello, {name}</h1>

class HelloMessageContainer extends React.Component {
  constructor({ name }) {
    super()
    this.state = { name }
    this.fetchRemoteName()
  }

  fetchRemoteName() {
    setTimeout(async () => {
      const { name } = await fetch('/api').then(res => res.json())
      this.setState({ name })
    }, 2000)
  }

  render() {
    return <HelloMessage name={this.state.name} />
  }
}

const App = document.getElementById("app");

ReactDOM.render(<HelloMessageContainer name="Daniel" />, App);