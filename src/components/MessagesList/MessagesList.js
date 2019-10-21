import React, { Component } from 'react'
import { Comment, Segment } from 'semantic-ui-react'

import firebase from '../../firebase'

import MessagesHeader from './MessagesHeader'
import MessagesForm from './MessagesForm'
class MessagesList extends Component {
  state = {
    messagesRef: firebase.database().ref('messages'),
  }
  render() {
    const { messagesRef } = this.state
    return (
      <React.Fragment>
        <MessagesHeader />
        <Segment>
          <Comment.Group className='messages'>
            {/* Chat goes here */}
          </Comment.Group>
        </Segment>
        <MessagesForm messagesRef={messagesRef} />
      </React.Fragment>
    )
  }
}
export default MessagesList
