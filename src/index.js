import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'

import { BrowserRouter, Switch, Route, withRouter } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import 'semantic-ui-css/semantic.min.css'

import firebase from './firebase'
import { reducers } from './reducers'
import { setUser } from './actions'

import App from './components/App'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Spinner from './components/Spinner'

const store = createStore(reducers, composeWithDevTools())
class Root extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.setUser(user)
        this.props.history.push('/')
      }
    })
  }
  render() {
    return this.props.isLoading ? (
      <Spinner />
    ) : (
      <Switch>
        <Route exact path='/' component={App} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
      </Switch>
    )
  }
}
const mapStateFromProps = state => ({
  isLoading: state.user.isLoading,
})
const RootWithRouter = withRouter(
  connect(
    mapStateFromProps,
    { setUser }
  )(Root)
)
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <RootWithRouter />
    </BrowserRouter>
  </Provider>,

  document.getElementById('root')
)
registerServiceWorker()
