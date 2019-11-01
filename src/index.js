import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'

import { BrowserRouter, Switch, Route, withRouter } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import 'semantic-ui-css/semantic.min.css'

import firebase from './services/firebase'
import { reducers } from './reducers'
import { setUser, clearUser } from './actions'

import App from './components/App'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Spinner from './components/Spinner'

const store = createStore(reducers, composeWithDevTools())
class Root extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      // TODO refactor with dispatch
      if (user) {
        this.props.setUser(user)
        this.props.history.push('/')
      } else {
        this.props.history.push('/login')
        this.props.clearUser()
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
    { setUser, clearUser }
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
