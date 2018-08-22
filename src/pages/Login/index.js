import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Card } from 'antd'

import { onLoginSubmit } from './actions/login'

import LoginForm from './form'
import RouterButton from './components/RouterButton'

const Login = ({
  user,
  onLoginSubmit
}) =>
  user.isAuthenticated ?
  <Redirect to='/' from='/login' />
  :
  <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px', marginBottom: '50px' }}>
    <Card
      style={{ width: 300 }}
      title="Login"
      actions={[<RouterButton to="/signup" from="/login" prefix="Don't have an account?" label="Sign up" />]}
      >
        <LoginForm onSubmit={onLoginSubmit} />
      </Card>
  </div>

const mapStateToProps = ({user}) =>
({
  user,
})

const mapDispatchToProps = dispatch =>
({
  onLoginSubmit: user => dispatch(onLoginSubmit(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
