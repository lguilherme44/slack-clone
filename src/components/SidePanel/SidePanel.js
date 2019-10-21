import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

import Channels from './Channels'
import UserPanel from './UserPanel'
class SidePanel extends Component {
  render() {
    return (
      <Menu
        size='large'
        inverted
        fixed='left'
        vertical
        style={{ background: '#2a2c2d', fontSize: '1.2rem' }}
      >
        <UserPanel />
        <Channels />
      </Menu>
    )
  }
}
export default SidePanel
