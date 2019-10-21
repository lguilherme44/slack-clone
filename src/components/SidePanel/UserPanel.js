import React, { Component } from 'react'
import { connect } from 'react-redux'
import firebase from '../../firebase'
import { Dropdown, Grid, Header, Icon, Image } from 'semantic-ui-react'

class UserPanel extends Component {
  handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log('signed out'))
  }
  render() {
    const { currentUser } = this.props
    const userName = (
      <span>
        <Image src={currentUser.photoURL} spaced='right' avatar />
        Signed in as{' '}
        <strong style={{ color: 'orange' }}>{currentUser.displayName}</strong>
      </span>
    )
    return (
      <Grid style={{ background: '#2a2c2d' }}>
        <Grid.Column>
          <Grid.Row style={{ padding: '1.2em', margin: 0 }}>
            <Header inverted floated='left' as='h2'>
              <Icon name='code' />
              <Header.Content>Wazzup</Header.Content>
            </Header>
          </Grid.Row>
          {/* DropDown */}
          <Header style={{ padding: '0.25em' }} as='h4' inverted>
            <Dropdown trigger={userName}>
              <Dropdown.Menu>
                <Dropdown.Item icon='user circle' text='Change avatar' />
                <Dropdown.Item
                  onClick={this.handleSignOut}
                  icon='sign-out'
                  text='Sign out'
                />
              </Dropdown.Menu>
            </Dropdown>
          </Header>
        </Grid.Column>
      </Grid>
    )
  }
}
const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser,
  }
}
export default connect(mapStateToProps)(UserPanel)
