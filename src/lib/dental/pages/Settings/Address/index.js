import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card } from 'antd'
import { Redirect } from 'react-router-dom'

import AddressForm from './form'

import { onSaveAddressSettings } from './actions'

class Address extends Component {
  render() {
    const { user, onSaveAddressSettings } = this.props
    if (!user.isAuthenticated) {
      return <Redirect to='/' />
    }
    return (
      <Card title='Billing Address' style={{ width: 350 }}>
        <AddressForm onSubmit={address => onSaveAddressSettings(address, user)} />
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
  onSaveAddressSettings: (account, user) => dispatch(onSaveAddressSettings(account, user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Address)
