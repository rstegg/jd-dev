import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'

import { Card } from 'antd'

import { onSignupSubmit } from './actions/signup'

import SignupForm from './form'
import RouterButton from './components/RouterButton'

class Signup extends Component {
  render() {
    const { user, onSignupSubmit } = this.props
    if (user.isAuthenticated) {
      return <Redirect to='/' from='/signup' />
    }
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px', marginBottom: '50px' }}>
        <Card
          style={{ width: 300 }}
          title="Signup"
          actions={[<RouterButton to="/login" from="/signup" prefix="Have an account?" label="Login" />]}
          >
            <SignupForm onSubmit={onSignupSubmit} />
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
  onSignupSubmit: user => dispatch(onSignupSubmit(user)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup))
