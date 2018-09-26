const router = require('express').Router()
const passport = apiRequire('service/auth')
const { allPass, path, pipe, prop, is } = require('ramda')

const createOrderHandler = require('./handlers/create')
const getOrdersHandler = require('./handlers/getAll')
const getOrdersCountHandler = require('./handlers/getAllCount')
const getDesignOrdersHandler = require('./handlers/getAllDesign')
const getOrderHandler = require('./handlers/get')
const deleteOrderHandler = require('./handlers/delete')
const setDesignerOrderHandler = require('./handlers/setDesigner')
const reassignOrderHandler = require('./handlers/reassign')
const addOrderNoteHandler = require('./handlers/addNotes')
const setOrderPrefsHandler = require('./handlers/setPrefs')

const validateBody = apiRequire('middleware/validate-body')
const validateParams = apiRequire('middleware/validate-params')
const validFields = apiRequire('middleware/valid-fields')
const validField = apiRequire('middleware/valid-field')

const validOrder = validField('orders')
const validSingle = validField('order')
const validPrefs = validField('prefs')
const validNote = validField('note')
const validEditOrderParams = validFields(false, [ 'id' ])

module.exports = io =>
  router
    .use(passport.authenticate('jwt', { session: false }))
    .get('/design',
      getDesignOrdersHandler
    )
    .get('/dashboard',
      getOrdersCountHandler
    )
    .get('/',
      getOrdersHandler
    )
    .get('/:id',
      getOrderHandler
    )
    .post('/',
      validateBody(validOrder),
      createOrderHandler,
      setDesignerOrderHandler(io)
    )
    .post('/reassign',
      validateBody(validSingle),
      reassignOrderHandler(io)
    )
    .put('/:uid/notes',
      validateBody(validNote),
      addOrderNoteHandler
    )
    .put('/:uid/prefs',
      validateBody(validPrefs),
      setOrderPrefsHandler
    )
    .delete('/',
      deleteOrderHandler
    )
