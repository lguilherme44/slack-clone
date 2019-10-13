import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import App from './components/App'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'

const Root = () => (
  <BrowserRouter>
    <Switch>
      <Route exact to='/' component={App} />
      <Route exact to='/login' component={Login} />
      <Route exact to='/register' component={Register} />
    </Switch>
  </BrowserRouter>
)

ReactDOM.render(<Root />, document.getElementById('root'))
registerServiceWorker()
