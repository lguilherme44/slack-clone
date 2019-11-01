import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Comment, Segment } from 'semantic-ui-react'

import firebaseService from '../../services/firebaseService'

import Message from './Message'
import MessagesHeader from './MessagesHeader'
import MessagesForm from './MessagesForm'
class MessagesList extends Component {
  state = {
    messages: [],
    isLoading: true,
  }
  componentDidMount() {
    const { currentChannel, currentUser } = this.props
    if (currentChannel && currentUser) {
      this.addListeners(currentChannel.id)
    }
  }
  componentWillUnmount() {
    this.removeListeners()
  }
  addListeners = channelId => {
    this.addMessageListener(channelId)
  }
  addMessageListener = channelId => {
    let loadedMessages = []
    firebaseService.messagesRef.child(channelId).on('child_added', snap => {
      loadedMessages.push(snap.val())
      this.setState({ messages: loadedMessages, isLoading: false })
    })
  }
  removeListeners = () => {
    firebaseService.messagesRef.off()
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
    const { messages } = this.state
    return (
      <React.Fragment>
        <MessagesHeader />
        <Segment>
          <Comment.Group className='messages'>
            {this.displayMessages(messages)}
          </Comment.Group>
        </Segment>
        <MessagesForm />
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
