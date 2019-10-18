import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Icon, Menu } from 'semantic-ui-react'

class Channels extends Component {
  render() {
    const { channels = [] } = this.props
    return (
      <Menu.Menu style={{ paddingBottom: '2em' }}>
        <Menu.Item>
          <span>
            <Icon name='exchange' /> CHANNELS
          </span>
          ( {channels.length}) <Icon name='add' />
        </Menu.Item>
      </Menu.Menu>
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
