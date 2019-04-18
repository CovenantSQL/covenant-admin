import * as React from 'react'
import createHistory from 'history/createBrowserHistory'

import Login from '~/pages/Login'
import Home from '~/pages/Home'
import Auth from '~/components/Auth'
import Callback from '~/components/Callback'

import { Switch, Router, Route, Redirect } from 'react-router-dom'
import 'antd/dist/antd.css'
import './styles/main.css'

export const history = createHistory()
export const auth = new Auth()
const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication()
  }
}

const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route path='/' render={(props) => <Home auth={auth} {...props} />} exact/>
      <Route path='/login' render={(props) => <Login auth={auth} {...props} />} />
      <Route path='/callback'
        render={(props) => {
          handleAuthentication(props)
          return <Callback {...props} />
        }}
      />
      <Redirect from="*" to="/" />
    </Switch>
  </Router>
)

export default Routes
