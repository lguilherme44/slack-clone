import React from 'react'
import { Grid } from 'semantic-ui-react'
import './App.css'
import ColorPanel from './ColorPanel/ColorPanel'
import SidePanel from './SidePanel/SidePanel'
import MessagesList from './MessagesList/MessagesList'
import MetaPanel from './MetaPanel/MetaPanel'

const App = () => {
  return (
    <Grid columns='equal' className='app' style={{ background: '#eee' }}>
      <ColorPanel />
      <SidePanel />
      <Grid.Column style={{ marginLeft: '320px' }}>
        <MessagesList />
      </Grid.Column>
      <Grid.Column width={4}>
        <MetaPanel />
      </Grid.Column>
    </Grid>
  )
}

export default App
