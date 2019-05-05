import React from 'react'
import T from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { DROP_SHADOWS, FONT_SIZES } from './style-constants'

const message = T.shape({
  content: T.string.isRequired,
  from: T.shape({
    name: T.string,
    id: T.string,
  }),
  time: T.string,
})

const member = T.shape({
  id: T.string.isRequired,
  info: T.shape({
    name: T.string.isRequired,
    avatar: T.string,
  }).isRequired,
})

const ChatMembers = ({ members, ...props }) => (
  <div style={{ display: 'flex', justifyContent: 'flex-end' }} {...props}>
    {members.map(member => (
      <div
        key={member.id}
        title={member.info.name}
        style={{
          width: 50,
          height: 50,
          backgroundColor: 'grey',
          backgroundImage: `url(${member.info.avatar})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '50%',
          marginLeft: 10,
        }}
      />
    ))}
  </div>
)

ChatMembers.propTypes = {
  members: T.arrayOf(member).isRequired,
}

const StyledInput = styled.input`
  padding: 0 10px;
  display: block;
  width: 100%;
  font-size: ${FONT_SIZES.BASE};
  height: 50px;
`

const ChatInputBar = ({ onMessage, ...props }) => {
  const [message, setMessage] = React.useState('')

  const handleKeyPress = evt => {
    const { value } = evt.target
    if (evt.key === 'Enter') {
      onMessage(value)
      setMessage('')
    }
  }

  return (
    <StyledInput
      placeholder="message"
      onChange={evt => setMessage(evt.target.value)}
      value={message}
      onKeyUp={handleKeyPress}
      {...props}
    />
  )
}

ChatInputBar.propTypes = {
  onMessage: T.func.isRequired,
}

const Messages = ({ messages, ...props }) => {
  const messageItems = messages.map(({ content, from, time }) => (
    <li key={time}>
      {new Date(time).toLocaleTimeString().slice(0, -3)} - {from.name} - {content}
    </li>
  ))
  return (
    <div {...props}>
      <ul>{messageItems}</ul>
    </div>
  )
}

Messages.propTypes = {
  messages: T.arrayOf(message),
}

const ChatWrapper = styled.div`
  box-shadow: ${DROP_SHADOWS.SMALL.normal};
  width: 100%;
  max-width: 600px;
  max-height: 600px;
  padding: 10px;
  display: flex;
  flex-direction: column;
`

let Chat = ({ members, messages, sendMessage, ...props }) => (
  <ChatWrapper {...props}>
    <ChatMembers members={members} />
    <Messages messages={messages} style={{ maxHeight: '550px', overflowY: 'scroll' }} />
    <ChatInputBar onMessage={sendMessage} style={{ marginTop: 'auto' }} />
  </ChatWrapper>
)

const mapStateToProps = state => ({
  messages: state.room.messages,
  members: state.room.members,
})

const mapDispatchToProps = ({ room: { sendMessage } }) => ({
  sendMessage,
})

Chat = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chat)

export { Chat }
