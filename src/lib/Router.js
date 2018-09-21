import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { connect } from 'react-redux'

import DesignRouter from './design/Router'
import DentalRouter from './dental/Router'

const LibRouter = ({ user }) =>
  !user.isAuthenticated ? <Redirect to='/login' from='/' />
  : user.userType === 'designer' ? <DesignRouter />
  : <DentalRouter />

const mapStateToProps = ({ user }) => ({ user })

export default connect(mapStateToProps)(LibRouter)
