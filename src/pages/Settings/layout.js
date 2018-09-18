import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import SettingsNav from './nav'

import './Styles.css'

const Settings = ({ user, children }) =>
  !user.isAuthenticated ?
    <Redirect to='/' />
  :
  <div className='settings'>
    <SettingsNav />
    {children}
  </div>

const mapStateToProps = ({ user }) =>
({
  user
})

export default connect(mapStateToProps)(Settings)
