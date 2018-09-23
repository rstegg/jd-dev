import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'

import { Card } from 'antd'

import { onCreateUserSubmit } from './actions/createuser'

import CreateUserForm from './form'

class CreateUser extends Component {
  render() {
    const { user, onCreateUserSubmit } = this.props
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px', marginBottom: '50px' }}>
        <Card
          style={{ width: 300 }}
          title="Create User"
          >
            <CreateUserForm onSubmit={values => onCreateUserSubmit(values, user.token)} />
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
  onCreateUserSubmit: (user, token) => dispatch(onCreateUserSubmit(user, token)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateUser))
