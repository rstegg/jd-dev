import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from 'antd'

const SettingsNav = () =>
  <Button.Group style={{ display: 'flex', flexDirection: 'column' }} className='settings-nav'>
    <NavLink to='/settings/account'>
      <Button>Account</Button>
    </NavLink>
    <NavLink to='/settings/wallet'>
      <Button>Payment Options</Button>
    </NavLink>
    <NavLink to='/settings/address'>
      <Button>Billing Address</Button>
    </NavLink>
    <NavLink to='/settings/notifications'>
      <Button>Notifications</Button>
    </NavLink>
  </Button.Group>

export default SettingsNav
