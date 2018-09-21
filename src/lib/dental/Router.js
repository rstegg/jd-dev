import React from 'react'
import { Route, Switch } from 'react-router'

import Dashboard from './pages/Dashboard'
import Orders from './pages/Orders'
import Profile from '../shared/pages/Profile'
import SettingsRouter from '../shared/pages/Settings/Router'

const DesignRouter = () =>
  <Switch>
    <Route exact path="/" component={Dashboard} />
    <Route exact path="/orders" component={Orders} />
    <Route exact path="/profile" component={Profile} />
    <Route path="/settings" component={SettingsRouter} />
  </Switch>

export default DesignRouter
