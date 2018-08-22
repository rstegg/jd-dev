const router = require('express').Router()
const passport = apiRequire('service/auth')
const { allPass, path, pipe, prop, is } = require('ramda')

const createOrderHandler = require('./handlers/create')
const editOrderHandler = require('./handlers/edit')
const getOrdersHandler = require('./handlers/getAll')
const getOrderHandler = require('./handlers/get')
const deleteOrderHandler = require('./handlers/delete')

const validateBody = apiRequire('middleware/validate-body')
const validateParams = apiRequire('middleware/validate-params')
const validFields = apiRequire('middleware/valid-fields')

const validOrder = validFields('order', [ 'name', 'type', 'units', 'notes' ])
const validEditOrderParams = validFields(false, [ 'id'])

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
      createOrderHandler
    )
    .put('/:id',
      validateBody(validOrder),
      validateParams(validEditOrderParams),
      editOrderHandler
    )
    .delete('/:id',
      deleteOrderHandler
    )
