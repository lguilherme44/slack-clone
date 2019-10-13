import React, { Component } from 'react'
import firebase from '../../firebase'

import { Link } from 'react-router-dom'
import {
  Button,
  Grid,
  Form,
  Header,
  Icon,
  Message,
  Segment,
} from 'semantic-ui-react'

class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleSubmit = e => {
    e.preventDefault()
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(createdUser => {
        console.log(createdUser)
      })
      .catch(err => {
        console.log(err)
      })
  }
  render() {
    const { username, email, password, passwordConfirmation } = this.state
    return (
      <Grid textAlign='center' verticalAlign='middle' className='app'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' icon color='orange' textAlign='center'>
            <Icon name='puzzle piece' color='orange' />
            Register for Chat
          </Header>
          <Form onSubmit={this.handleSubmit} size='large'>
            <Segment>
              <Form.Input
                fluid
                name='username'
                icon='user'
                iconPosition='left'
                placeholder='Username'
                onChange={this.handleChange}
                type='text'
                value={username}
              />
              <Form.Input
                fluid
                name='email'
                icon='mail'
                iconPosition='left'
                placeholder='Email'
                onChange={this.handleChange}
                type='email'
                value={email}
              />
              <Form.Input
                fluid
                name='password'
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                onChange={this.handleChange}
                type='password'
                value={password}
              />
              <Form.Input
                fluid
                name='passwordConfirmation'
                icon='repeat'
                iconPosition='left'
                placeholder='Confirm your password'
                onChange={this.handleChange}
                type='password'
                value={passwordConfirmation}
              />
              <Button color='orange' fluid size='large'>
                Sign Up
              </Button>
            </Segment>
          </Form>
          <Message>
            Already have an account? <Link to='/login'>Sign In</Link>
          </Message>
        </Grid.Column>
      </Grid>
    )
  }
}
export default Register
