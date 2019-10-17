import React, { Component } from 'react'
import { Dropdown, Grid, Header, Icon } from 'semantic-ui-react'

class UserPanel extends Component {
  dropdownOptions = () => {
    return [
      {
        key: 'user',
        text: (
          <span>
            Signed in as <strong>User</strong>
          </span>
        ),
        disabled: true,
      },
      {
        key: 'avatar',
        text: <span>Change avatar</span>,
      },
      {
        key: 'signout',
        text: <span>Sign out</span>,
      },
    ]
  }
  render() {
    return (
      <Grid style={{ background: '#4c3c4c' }}>
        <Grid.Column>
          <Grid.Row style={{ padding: '1.2em', margin: 0 }}>
            <Header inverted floated='left' as='h2'>
              <Icon name='code' />
              <Header.Content>Wazzup</Header.Content>
            </Header>
          </Grid.Row>
          {/* DropDown */}
          <Header style={{ padding: '0.25em' }} as='h4' inverted>
            <Dropdown trigger={<span>Signed in as</span>}>
              <Dropdown.Menu>
                <Dropdown.Item icon='user circle' text='Change avatar' />
                <Dropdown.Item icon='sign-out' text='Sign out' />
              </Dropdown.Menu>
            </Dropdown>
          </Header>
        </Grid.Column>
      </Grid>
    )
  }
}
export default UserPanel
