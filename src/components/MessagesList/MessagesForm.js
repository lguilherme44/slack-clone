import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Input, Segment } from 'semantic-ui-react'
import firebase from '../../firebase'

class MessagesForm extends Component {
  state = {
    errors: [],
    isLoading: false,
    message: '',
  }
  createMessage = () => {
    const { currentUser } = this.props
    const { message } = this.state
    const newMessage = {
      content: message,
      timeStamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: currentUser.uid,
        name: currentUser.displayName,
        avatar: currentUser.photoURL,
      },
    }
    return newMessage
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  sendMessage = () => {
    const { currentChannel, messagesRef } = this.props
    const { message } = this.state
    if (message) {
      this.setState({ isLoading: true })
      messagesRef
        .child(currentChannel.id)
        .push()
        .set(this.createMessage())
        .then(() => {
          this.setState({ isLoading: false, message: '', errors: [] })
        })
        .catch(err => {
          console.log(err)
          this.setState({
            isLoading: false,
            errors: this.state.errors.concat(err),
          })
        })
    } else {
      this.setState({ errors: this.state.errors.concat('Add a message') })
    }
  }
  render() {
    const { errors } = this.state
    return (
      <Segment className='message__form'>
        <Input
          fluid
          className={
            errors.some(error => error.includes('message')) ? 'error' : ''
          }
          name='message'
          onChange={this.handleChange}
          style={{ margenBottom: '0.5em' }}
          label={<Button icon={'add'} />}
          labelPosition='left'
          placeholder='Write your message'
        />
        <Button.Group icon widths='2' style={{ marginTop: '1em' }}>
          <Button
            basic
            onClick={this.sendMessage}
            color='blue'
            content='Add reply'
            labelPosition='left'
            icon='edit'
          />
          <Button
            basic
            color='grey'
            content='Upload media'
            labelPosition='right'
            icon='cloud upload'
          />
        </Button.Group>
      </Segment>
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
)(MessagesForm)
