import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'

import { Card, message } from 'antd'

import { onResetSubmit } from './actions/reset'

import ResetForm from './form'
import RouterButton from './components/RouterButton'

class Reset extends Component {
  componentWillUpdate(nextProps) {
    if (!this.props.user.resetSuccess && nextProps.user.resetSuccess) {
      message.success('Success! Please login with your new password.');
    }
  }
  render() {
    const { user, onResetSubmit } = this.props
    if (user.isAuthenticated) {
      return <Redirect to='/' from='/login' />
    }
    if (user.resetSuccess) {
      return <Redirect to='/login' />
    }
    const { permalink, verifyToken } = this.props.match.params
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px', marginBottom: '50px' }}>
        <Card
          style={{ width: 300 }}
          title="Change Password"
          actions={[<RouterButton to="/login" prefix="Have an account?" label="Login" />]}
          >
          <ResetForm onSubmit={values => onResetSubmit(permalink, verifyToken, values)} />
        </Card>
      </div>
    )
  }
}

const mapStateToProps = ({ user }) =>
({
  user,
})

const mapDispatchToProps = dispatch =>
({
  onResetSubmit: (permalink, verifyToken, user) => dispatch(onResetSubmit(permalink, verifyToken, user)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Reset))
