import React from 'react'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import './App.css'
import ColorPanel from './ColorPanel/ColorPanel'
import SidePanel from './SidePanel/SidePanel'
import MessagesList from './MessagesList/MessagesList'
import MetaPanel from './MetaPanel/MetaPanel'

const App = ({ currentUser, currentChannel }) => {
  return (
    <Grid columns='equal' className='app' style={{ background: '#eee' }}>
      <ColorPanel />
      <SidePanel key={currentUser && currentUser.id} />
      <Grid.Column style={{ marginLeft: '320px' }}>
        <MessagesList key={currentChannel && currentChannel.id} />
      </Grid.Column>
      <Grid.Column width={4}>
        <MetaPanel />
      </Grid.Column>
    </Grid>
  )
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
)(App)
