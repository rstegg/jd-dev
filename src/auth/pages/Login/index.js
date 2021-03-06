import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter, Redirect } from 'react-router-dom'

import { Card } from 'antd'

import { onLoginSubmit } from './actions/login'

import LoginForm from './form'
import RouterButton from './components/RouterButton'

class Login extends Component {
  render() {
    const { user, onLoginSubmit } = this.props
    if (user.isAuthenticated) {
      return <Redirect to='/' from='/login' />
    }
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px', marginBottom: '50px' }}>
        <Card
          style={{ width: 300 }}
          title="Login"
          actions={[<RouterButton to="/signup" prefix="Don't have an account?" label="Sign up" />]}
          >
          <LoginForm onSubmit={onLoginSubmit} />
          <NavLink to="/forgot">Forgot password?</NavLink>
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
  onLoginSubmit: user => dispatch(onLoginSubmit(user)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
