import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { connect } from 'react-redux'

import AdminRouter from './admin/Router'
import DesignRouter from './design/Router'
import DentalRouter from './dental/Router'

class LibRouter extends Component {
  render() {
    const { user } = this.props
    if (!user.isAuthenticated) {
      return <Redirect to='/login' from='/' />
    }
    switch(user.userType) {
      case 'admin':
        return <AdminRouter />
      case 'designer':
        return <DesignRouter />
      default:
        return <DentalRouter />
    }
  }
}

const mapStateToProps = ({ user }) => ({ user })

export default connect(mapStateToProps)(LibRouter)
