import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import firebase from './firebase'
import 'semantic-ui-css/semantic.min.css'

import { BrowserRouter, Switch, Route, withRouter } from 'react-router-dom'

import App from './components/App'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'

class Root extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.history.push('/')
      }
    })
  }
  render() {
    return (
      <Switch>
        <Route exact path='/' component={App} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
      </Switch>
    )
  }
}
const RootWithRouter = withRouter(Root)
ReactDOM.render(
  <BrowserRouter>
    <RootWithRouter />
  </BrowserRouter>,
  document.getElementById('root')
)
registerServiceWorker()
