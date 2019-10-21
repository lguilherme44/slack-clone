import React, { Component } from 'react'
import { Comment, Segment } from 'semantic-ui-react'
import MessagesHeader from './MessagesHeader'
import MessagesForm from './MessagesForm'
class MessagesList extends Component {
  render() {
    return (
      <React.Fragment>
        <MessagesHeader />
        <Segment>
          <Comment.Group className='messages'>
            {/* Chat goes here */}
          </Comment.Group>
        </Segment>
        <MessagesForm />
      </React.Fragment>
    )
  }
}
export default MessagesList
