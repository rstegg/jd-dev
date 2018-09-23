import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, message } from 'antd'
import { Redirect } from 'react-router-dom'
import { reset } from 'redux-form'

import SettingsForm from './form'

import { onSaveAccountSettings, resetAccountSettings } from './actions'

class Settings extends Component {
  componentWillUpdate(nextProps) {
    if (!this.props.account.isSuccessful && nextProps.account.isSuccessful) {
      message.success('Password updated successfully', 5);
      this.props.resetAccountSettings()
    }
  }
  render() {
    const { user, onSaveAccountSettings } = this.props
    if (!user.isAuthenticated) {
      return <Redirect to='/' />
    }
    return (
      <Card title='Account Settings' style={{ width: 350 }}>
        <SettingsForm onSubmit={account => onSaveAccountSettings(account, user.token)} loading={this.props.account.isLoading} />
      </Card>
    )
  }
}

const mapStateToProps = ({ user, account }) =>
({
  user,
  account
})

const mapDispatchToProps = dispatch =>
({
  onSaveAccountSettings: (account, token) => dispatch(onSaveAccountSettings(account, token)),
  resetAccountSettings: () => dispatch(resetAccountSettings()) && dispatch(reset('accountSettings')),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings)
