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

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: [],
    loading: false,
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleInputError = (errors, inputName) => {
    return errors.some(error => error.message.toLowerCase().includes(inputName))
      ? 'error'
      : ''
  }
  displayErrors = errors => {
    return errors.map((error, i) => <p key={i}>{error.message}</p>)
  }
  handleSubmit = e => {
    e.preventDefault()
    if (this.isFormValid(this.state)) {
      this.setState({ errors: [], loading: true })
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(signedInUser => {
          console.log(signedInUser)
        })
        .catch(err => {
          console.log(err)
          this.setState({
            errors: this.state.errors.concat(err),
            loading: false,
          })
        })
    }
  }
  isFormValid = ({ email, password }) => {
    return email && password
  }
  render() {
    const { email, password, errors, loading } = this.state
    return (
      <Grid textAlign='center' verticalAlign='middle' className='app'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' icon color='violet' textAlign='center'>
            <Icon name='code branch' color='violet' />
            Login to Chat
          </Header>
          <Form onSubmit={this.handleSubmit} size='large'>
            <Segment>
              <Form.Input
                fluid
                name='email'
                icon='mail'
                iconPosition='left'
                placeholder='Email'
                onChange={this.handleChange}
                className={this.handleInputError(errors, 'email')}
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
                className={this.handleInputError(errors, 'password')}
                type='password'
                value={password}
              />
              <Button
                disabled={loading}
                className={loading ? 'loading' : ''}
                color='violet'
                fluid
                size='large'
              >
                Sign In
              </Button>
            </Segment>
          </Form>
          {this.state.errors.length > 0 && (
            <Message error>
              <h4>Error</h4>
              {this.displayErrors(errors)}
            </Message>
          )}
          <Message>
            Don't have an account? <Link to='/register'>Sign Up</Link>
          </Message>
        </Grid.Column>
      </Grid>
    )
  }
}
export default Login
