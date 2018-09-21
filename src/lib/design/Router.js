import React from 'react'
import { Route, Switch } from 'react-router'

import Cases from './pages/Cases'
import Profile from '../shared/pages/Profile'
import SettingsRouter from '../shared/pages/Settings/Router'

const DesignRouter = () =>
  <Switch>
    <Route exact path="/" component={Cases} />
    <Route exact path="/profile" component={Profile} />
    <Route path="/settings" component={SettingsRouter} />
  </Switch>

export default DesignRouter
