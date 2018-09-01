const router = require('express').Router()
const passport = apiRequire('service/auth')
const { allPass, path, pipe, prop, is } = require('ramda')

const createOrderHandler = require('./handlers/create')
const editOrderHandler = require('./handlers/edit')
const getOrdersHandler = require('./handlers/getAll')
const getOrderHandler = require('./handlers/get')
const deleteOrderHandler = require('./handlers/delete')
const setDesignerOrderHandler = require('./handlers/setDesigner')

const validateBody = apiRequire('middleware/validate-body')
const validateParams = apiRequire('middleware/validate-params')
const validFields = apiRequire('middleware/valid-fields')
const validField = apiRequire('middleware/valid-field')

const validOrder = validField('orders')
const validSingle = validField('order')
const validEditOrderParams = validFields(false, [ 'id' ])

module.exports =
  router
    .use(passport.authenticate('jwt', { session: false }))
    .get('/',
      getOrdersHandler
    )
    .get('/:id',
      getOrderHandler
    )
    .post('/',
      validateBody(validOrder),
      createOrderHandler,
      setDesignerOrderHandler
    )
    .post('/new_designer',
      validateBody(validSingle),
      setDesignerOrderHandler
    )
    .put('/:id',
      validateBody(validOrder),
      validateParams(validEditOrderParams),
      editOrderHandler
    )
    .delete('/',
      deleteOrderHandler
    )
