import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card } from 'antd'
import { Redirect } from 'react-router-dom'

import SettingsForm from './form'

import { onSaveAccountSettings } from './actions'

class Settings extends Component {
  render() {
    const { user, onSaveAccountSettings } = this.props
    if (!user.isAuthenticated) {
      return <Redirect to='/' />
    }
    return (
      <Card title='Account Settings' style={{ width: 350 }}>
        <SettingsForm onSubmit={account => onSaveAccountSettings(account, user)} />
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
  onSaveAccountSettings: (account, user) => dispatch(onSaveAccountSettings(account, user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings)
