import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { connect } from 'react-redux'

import DesignRouter from './design/Router'
import DentalRouter from './dental/Router'

class LibRouter extends Component {
  render() {
    const { user } = this.props
    if (!user.isAuthenticated) {
      return <Redirect to='/login' from='/' />
    }
    if (user.userType === 'designer') {
      return <DesignRouter />
    }
    return <DentalRouter />
  }
}

const mapStateToProps = ({ user }) => ({ user })

export default connect(mapStateToProps)(LibRouter)
