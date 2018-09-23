import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form';

import admin from './admin'
import bank from './bank'
import card from './card'
import cases from './cases'
import dashboard from './dashboard'
import errors from './errors'
import files from './files'
import notifications from './notifications'
import orders from './orders'
import products from './products'
import profile from './profile'
import redirects from './redirects'
import user from './user'

export default combineReducers({
  admin,
  bank,
  card,
  cases,
  dashboard,
  errors,
  files,
  notifications,
  orders,
  products,
  profile,
  redirects,
  user,
  form: formReducer,
})
