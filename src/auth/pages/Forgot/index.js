import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'

import { Card, message } from 'antd'

import { onForgotSubmit } from './actions/forgot'

import SignupForm from './form'
import RouterButton from './components/RouterButton'

class Signup extends Component {
  componentWillUpdate(nextProps) {
    if (!this.props.user.forgotSuccess && nextProps.user.forgotSuccess) {
      message.success('Success! Please check your email for the next steps.');
    }
  }
  render() {
    const { user, onForgotSubmit } = this.props
    if (user.isAuthenticated) {
      return <Redirect to='/' from='/signup' />
    }
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px', marginBottom: '50px' }}>
        <Card
          style={{ width: 300 }}
          title="Forgot Password"
          actions={[<RouterButton to="/login" from="/forgot" prefix="Have an account?" label="Login" />]}
          >
            <SignupForm onSubmit={onForgotSubmit} />
          </Card>
      </div>
    )
  }
}

const mapStateToProps = ({user, posts}) =>
({
  user
})

const mapDispatchToProps = dispatch =>
({
  onForgotSubmit: user => dispatch(onForgotSubmit(user)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup))
