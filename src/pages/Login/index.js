import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'

import { Card } from 'antd'

import { onLoginSubmit } from './actions/login'

import LoginForm from './form'
import RouterButton from './components/RouterButton'

class Login extends Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(props) {
    console.log(props.location.pathname);
    return (props.location.pathname !== props.location.match)
  }
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
