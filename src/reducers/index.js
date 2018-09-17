import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form';

import products from './products'
import files from './files'
import redirects from './redirects'
import notifications from './notifications'
import errors from './errors'
import orders from './orders'
import user from './user'
import profile from './profile'

export default combineReducers({
  products,
  files,
  redirects,
  notifications,
  errors,
  orders,
  user,
  profile,
  form: formReducer,
})
