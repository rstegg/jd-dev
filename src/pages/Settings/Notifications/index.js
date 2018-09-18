import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card } from 'antd'
import { Redirect } from 'react-router-dom'

import NotificationsForm from './form'

import { onSaveNotificationsSettings } from './actions'

class Notifications extends Component {
  render() {
    const { user, onSaveNotificationsSettings } = this.props
    if (!user.isAuthenticated) {
      return <Redirect to='/' />
    }
    return (
      <Card title='Notifications' style={{ width: 350 }}>
        <NotificationsForm onSubmit={address => onSaveNotificationsSettings(address, user)} />
      </Card>
    )
  }
}

const mapStateToProps = ({ user }) =>
({
  user
})

const mapDispatchToProps = dispatch =>
({
  onSaveNotificationsSettings: (settings, user) => dispatch(onSaveNotificationsSettings(settings, user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications)
