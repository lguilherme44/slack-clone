import React, { Component } from 'react'
import { Button, Input, Segment } from 'semantic-ui-react'

class MessagesForm extends Component {
  render() {
    return (
      <Segment className='message__form'>
        <Input
          fluid
          name='message'
          style={{ margenBottom: '0.5em' }}
          label={<Button icon={'add'} />}
          labelPosition='left'
          placeholder='Write your message'
        />
        <Button.Group icon widths='2' style={{ marginTop: '1em' }}>
          <Button
            basic
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
export default MessagesForm
