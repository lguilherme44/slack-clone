import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Icon, Input, Menu, Modal } from 'semantic-ui-react'

class Channels extends Component {
  state = { channelName: '', channelDetails: '', openModal: false }
  closeModal = () => {
    this.setState({ openModal: false })
  }
  openModal = () => {
    this.setState({ openModal: true })
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  render() {
    const { channels = [] } = this.props
    const { openModal } = this.state
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
        </Menu.Menu>
        <Modal basic open={openModal} onClose={this.closeModal}>
          <Modal.Header>Add a channel</Modal.Header>
          <Modal.Content>
            <Form>
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
            <Button color='green' inverted>
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
  return { channels: state.channels }
}
export default connect(
  mapStateToProps,
  {}
)(Channels)
