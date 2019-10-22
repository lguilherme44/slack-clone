import React, { Component } from 'react'
import { connect } from 'react-redux'
import uuidv4 from 'uuid/v4'
import { Button, Input, Segment } from 'semantic-ui-react'
import firebase from '../../firebase'

import FileModal from './FileModal'
import Progressbar from './Progressbar'

class MessagesForm extends Component {
  state = {
    errors: [],
    isLoading: false,
    message: '',
    modal: false,
    uploadState: '',
    uploadTask: null,
    percentUploaded: 0,
    storageRef: firebase.storage().ref(),
  }
  createMessage = (fileURL = null) => {
    const { currentUser } = this.props
    const newMessage = {
      timeStamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: currentUser.uid,
        name: currentUser.displayName,
        avatar: currentUser.photoURL,
      },
    }
    if (fileURL !== null) {
      newMessage['image'] = fileURL
    } else {
      newMessage['content'] = this.state.message
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
  openModal = () => {
    this.setState({ modal: true })
  }
  closeModal = () => {
    this.setState({ modal: false })
  }
  uploadFile = (file, metadata) => {
    const pathToUpload = this.props.currentChannel.id
    const ref = this.props.messagesRef
    const filePath = `chat/public/${uuidv4()}.jpg`
    this.setState(
      {
        uploadState: 'uploading',
        uploadTask: this.state.storageRef.child(filePath).put(file, metadata),
      },
      () => {
        this.state.uploadTask.on(
          'state_changed',
          snap => {
            const percentUploaded = Math.round(
              (snap.bytesTransferred / snap.totalBytes) * 100
            )
            this.setState({ percentUploaded })
          },
          err => {
            console.error(err)
            this.setState({
              errors: this.state.errors.concat(err),
              uploadState: 'error',
              uploadTask: null,
            })
          },
          () => {
            this.state.uploadTask.snapshot.ref
              .getDownloadURL()
              .then(downloadURL => {
                this.sendFileMessage(downloadURL, ref, pathToUpload)
              })
              .catch(err => {
                console.error(err)
                this.setState({
                  errors: this.state.errors.concat(err),
                  uploadState: 'error',
                  uploadTask: null,
                })
              })
          }
        )
      }
    )
  }
  sendFileMessage = (fileURL, ref, pathToUpload) => {
    ref
      .child(pathToUpload)
      .push()
      .set(this.createMessage(fileURL))
      .then(() => {
        this.setState({ uploadState: 'done' })
      })
      .catch(err => {
        console.error(err)
        this.setState({
          errors: this.state.errors.concat(err),
        })
      })
  }
  render() {
    const {
      errors,
      message,
      modal,
      isLoading,
      uploadState,
      percentUploaded,
    } = this.state
    return (
      <Segment className='message__form'>
        <Input
          fluid
          className={
            errors.some(error => error.message.includes('message'))
              ? 'error'
              : ''
          }
          name='message'
          onChange={this.handleChange}
          style={{ marginBottom: '0.5em' }}
          label={<Button icon={'add'} />}
          labelPosition='left'
          placeholder='Write your message'
          value={message}
        />
        <Button.Group icon widths='2' style={{ marginTop: '1em' }}>
          <Button
            basic
            disabled={isLoading}
            onClick={this.sendMessage}
            color='blue'
            content='Add reply'
            labelPosition='left'
            icon='edit'
          />
          <Button
            basic
            onClick={this.openModal}
            color='grey'
            content='Upload media'
            labelPosition='right'
            icon='cloud upload'
          />
        </Button.Group>
        <FileModal
          modal={modal}
          closeModal={this.closeModal}
          uploadFile={this.uploadFile}
        />
        <Progressbar
          uploadState={uploadState}
          percentUploaded={percentUploaded}
        />
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
