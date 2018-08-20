import { combineReducers } from 'redux'

import products from './products'
import files from './files'
import productTypes from './product_types'
import allProducts from './all_products'
import options from './options'
import redirects from './redirects'
import errors from './errors'

export default combineReducers({
  products,
  allProducts,
  options,
  productTypes,
  files,
  redirects,
  errors
})
