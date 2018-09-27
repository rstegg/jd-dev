const router = require('express').Router()
const passport = apiRequire('service/auth')
const { allPass, path, pipe, prop, is, tap } = require('ramda')

const createUserHandler = require('./handlers/createUser')
const getUsersHandler = require('./handlers/getAllUsers')
const getCountsHandler = require('./handlers/getAllCounts')
const getOrdersHandler = require('./handlers/getAllOrders')
const banUserHandler = require('./handlers/banUser')
const unbanUserHandler = require('./handlers/unbanUser')
const reassignOrderHandler = require('./handlers/reassign')
const addOrderNoteHandler = require('./handlers/addNotes')

const validateBody = apiRequire('middleware/validate-body')
const validateParams = apiRequire('middleware/validate-params')
const validFields = apiRequire('middleware/valid-fields')
const validField = apiRequire('middleware/valid-field')
const hashPassword = apiRequire('middleware/hash-password')

const authenticateAdmin = apiRequire('middleware/authenticate-admin')

const validUser = validField('user')
const validSingle = validField('order')
const validPrefs = validField('prefs')
const validNote = validField('note')
const validEditOrderParams = validFields(false, [ 'id' ])

const logger = tap(console.log)

module.exports =
  router
    .use(passport.authenticate('jwt', { session: false }))
    .get('/users',
      getUsersHandler
    )
    .post('/users',
      validateBody(validUser),
      hashPassword,
      createUserHandler
    )
    .post('/users/unban',
      validateBody(validUser),
      unbanUserHandler
    )
    .delete('/users',
      banUserHandler
    )
    .get('/orders',
      getOrdersHandler
    )
    .get('/counts',
      getCountsHandler
    )
    .post('/orders/resassign',
      authenticateAdmin,
      reassignOrderHandler
    )
    .put('/orders/:uid/notes',
      authenticateAdmin,
      addOrderNoteHandler
    )
