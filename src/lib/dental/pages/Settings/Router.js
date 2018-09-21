import React from 'react'
import { Route, Switch } from 'react-router'

import SettingsLayout from './layout'

import AccountSettings from './Account'
import AddressSettings from './Address'
import WalletSettings from './Wallet'
import NotificationsSettings from './Notifications'

const SettingsRouter = () =>
  <SettingsLayout>
    <Switch>
      <Route exact path='/settings/account' component={AccountSettings} />
      <Route exact path='/settings/address' component={AddressSettings} />
      <Route exact path='/settings/wallet' component={WalletSettings} />
      <Route exact path='/settings/notifications' component={NotificationsSettings} />
    </Switch>
  </SettingsLayout>

export default SettingsRouter
