import React, { Component } from 'react'
import { connect } from 'react-redux'

import firebaseService from '../../services/firebaseService'
import { setCurrentChannel } from '../../actions'

import { Button, Form, Icon, Input, Menu, Modal } from 'semantic-ui-react'

class Channels extends Component {
  state = {
    activeChannel: '',
    channels: [],
    channelDetails: '',
    channelName: '',
    openModal: false,
    firstLoad: true,
  }
  componentDidMount() {
    this.addListeners()
  }
  componentWillUnmount() {
    this.removeListeners()
  }
  addChannel = () => {
    const { user } = this.props
    const { channelName, channelDetails } = this.state
    const key = firebaseService.channelsRef.push().key
    const newChannel = {
      id: key,
      name: channelName,
      description: channelDetails,
      createdBy: {
        name: user.displayName,
        avatar: user.photoURL,
      },
    }
    firebaseService
      .addChannel(key, newChannel)
      .then(() => {
        this.setState({ channelName: '', channelDetails: '' })
        this.closeModal()
        console.log('channel added')
      })
      .catch(err => {
        console.error(err)
      })
  }
  addListeners = () => {
    let loadedChannels = []
    firebaseService.channelsRef.on('child_added', snap => {
      loadedChannels.push(snap.val())
      this.setState({ channels: loadedChannels }, () => this.setFirstChannel())
    })
  }
  changeChannel = channel => {
    this.setActiveChannel(channel)
    this.props.setCurrentChannel(channel)
  }
  closeModal = () => {
    this.setState({ openModal: false })
  }
  displayChannels = channels => {
    return channels.map(channel => (
      <Menu.Item
        key={channel.id}
        onClick={() => this.changeChannel(channel)}
        name={channel.name}
        active={channel.id === this.state.activeChannel}
        style={{ opacity: 0.7 }}
      >
        # {channel.name}
      </Menu.Item>
    ))
  }
  openModal = () => {
    this.setState({ openModal: true })
  }
  removeListeners = () => {
    firebaseService.channelsRef.off()
  }
  setActiveChannel = channel => {
    this.setState({ activeChannel: channel.id })
  }
  setFirstChannel = () => {
    const firstChannel = this.state.channels[0]
    if (this.state.firstLoad && this.state.channels.length > 0) {
      this.props.setCurrentChannel(firstChannel)
      this.setActiveChannel(firstChannel)
    }
    this.setState({ firstLoad: false })
  }
  isFormValid = ({ channelName, channelDetails }) => {
    return channelName && channelDetails
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  handleSubmit = e => {
    e.preventDefault()
    if (this.isFormValid(this.state)) {
      this.addChannel()
    }
  }
  render() {
    const { channels, openModal } = this.state
    return (
      <React.Fragment>
        <Menu.Menu style={{ paddingBottom: '2em' }}>
          <Menu.Item>
            <span>
              <Icon name='exchange' /> CHANNELS
            </span>
            ({channels.length}){' '}
            <Icon
              name='add'
              onClick={this.openModal}
              style={{ cursor: 'pointer' }}
            />
          </Menu.Item>
          {channels.length > 0 && this.displayChannels(channels)}
        </Menu.Menu>
        {/* TODO: refactor modal window to separate component */}
        <Modal basic open={openModal} onClose={this.closeModal}>
          <Modal.Header>Add a channel</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <Input
                  fluid
                  label='Channel name'
                  name='channelName'
                  onChange={this.handleChange}
                ></Input>
              </Form.Field>
              <Form.Field>
                <Input
                  fluid
                  label='Description'
                  name='channelDetails'
                  onChange={this.handleChange}
                ></Input>
              </Form.Field>
            </Form>
          </Modal.Content>

          <Modal.Actions>
            <Button color='green' inverted onClick={this.handleSubmit}>
              <Icon name='checkmark' /> Add
            </Button>
            <Button color='red' inverted onClick={this.closeModal}>
              <Icon name='remove' /> Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    )
  }
}
const mapStateToProps = state => {
  return { user: state.user.currentUser }
}
export default connect(
  mapStateToProps,
  { setCurrentChannel }
)(Channels)
