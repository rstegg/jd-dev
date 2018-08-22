import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form';

import products from './products'
import files from './files'
import productTypes from './product_types'
import allProducts from './all_products'
import options from './options'
import redirects from './redirects'
import errors from './errors'
import orders from './orders'
import user from './user'
import chat from './chat'

export default combineReducers({
  products,
  allProducts,
  options,
  productTypes,
  files,
  redirects,
  errors,
  orders,
  user,
  chat,
  form: formReducer,
})
