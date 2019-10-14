import React, { Component } from 'react'
import firebase from '../../firebase'
import md5 from 'md5'

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
    errors: [],
    loading: false,
    usersRef: firebase.database().ref('users'),
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  isFormValid = () => {
    let errors = []
    let error
    if (this.isFormEmpty(this.state)) {
      error = { message: 'Please, fill all fields' }
      this.setState({ errors: errors.concat(error) })
      return false
    } else if (!this.isPasswordValid(this.state)) {
      error = { message: 'Password is not valid' }
      this.setState({ errors: errors.concat(error) })
      return false
    } else if (this.isEmailValid(this.state)) {
      error = { message: 'Email is not valid' }
      this.setState({ errors: errors.concat(error) })
      return false
    } else {
      return true
    }
  }
  isFormEmpty = ({ username, password, email, passwordConfirmation }) => {
    return (
      !username.length ||
      !password.length ||
      !email.length ||
      !passwordConfirmation.length
    )
  }
  isPasswordValid = ({ password, passwordConfirmation }) => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false
    } else if (password !== passwordConfirmation) {
      return false
    } else {
      return true
    }
  }
  isEmailValid({ email }) {
    const expRegMail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i
    return !expRegMail.test(email)
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
    if (this.isFormValid()) {
      this.setState({ errors: [], loading: true })
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(createdUser => {
          console.log(createdUser)
          createdUser.user
            .updateProfile({
              displayName: this.state.username,
              photoURL: `http://gravatar.com/avatar/${md5(
                createdUser.user.email
              )}?d=identicon`,
            })
            .then(() => {
              this.saveUser(createdUser).then(() => {
                console.log('user saved')
              })
            })
            .catch(err => {
              console.log(err)
              this.setState({
                errors: this.state.errors.concat(err),
                loading: false,
              })
            })
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
  saveUser = createdUser => {
    return this.state.usersRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL,
    })
  }
  render() {
    const {
      username,
      email,
      password,
      passwordConfirmation,
      errors,
      loading,
    } = this.state
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
                className={this.handleInputError(errors, 'username')}
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
              <Form.Input
                fluid
                name='passwordConfirmation'
                icon='repeat'
                iconPosition='left'
                placeholder='Confirm your password'
                onChange={this.handleChange}
                className={this.handleInputError(errors, 'password')}
                type='password'
                value={passwordConfirmation}
              />
              <Button
                disabled={loading}
                className={loading ? 'loading' : ''}
                color='orange'
                fluid
                size='large'
              >
                Sign Up
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
            Already have an account? <Link to='/login'>Sign In</Link>
          </Message>
        </Grid.Column>
      </Grid>
    )
  }
}
export default Register
