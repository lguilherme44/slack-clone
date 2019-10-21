import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Comment, Segment } from 'semantic-ui-react'

import firebase from '../../firebase'

import Message from './Message'
import MessagesHeader from './MessagesHeader'
import MessagesForm from './MessagesForm'
class MessagesList extends Component {
  state = {
    messages: [],
    messagesRef: firebase.database().ref('messages'),
    isLoading: true,
  }
  componentDidMount() {
    const { currentChannel, currentUser } = this.props
    if (currentChannel && currentUser) {
      this.addListeners(currentChannel.id)
    }
  }
  addListeners = channelId => {
    this.addMessageListener(channelId)
  }
  addMessageListener = channelId => {
    let loadedMessages = []
    this.state.messagesRef.child(channelId).on('child_added', snap => {
      loadedMessages.push(snap.val())
      this.setState({ messages: loadedMessages, isLoading: false })
    })
  }
  displayMessages = messages =>
    messages.length > 0 &&
    messages.map(message => (
      <Message
        key={message.timeStamp}
        message={message}
        user={this.props.currentUser}
      />
    ))
  render() {
    const { messages, messagesRef } = this.state
    return (
      <React.Fragment>
        <MessagesHeader />
        <Segment>
          <Comment.Group className='messages'>
            {this.displayMessages(messages)}
          </Comment.Group>
        </Segment>
        <MessagesForm messagesRef={messagesRef} />
      </React.Fragment>
    )
  }
}
const mapStateToProps = state => {
  return {
    currentChannel: state.channel.currentChannel,
    currentUser: state.user.currentUser,
  }
}
export default connect(
  mapStateToProps,
  {}
)(MessagesList)
