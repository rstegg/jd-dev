const router = require('express').Router()
const passport = apiRequire('service/auth')
const { allPass, path, pipe, prop, is, tap } = require('ramda')

const createUserHandler = require('./handlers/createUser')
const getUsersHandler = require('./handlers/getAllUsers')
const getCountsHandler = require('./handlers/getAllCounts')
const getOrdersHandler = require('./handlers/getAllOrders')
const banUserHandler = require('./handlers/banUser')

const validateBody = apiRequire('middleware/validate-body')
const validateParams = apiRequire('middleware/validate-params')
const validFields = apiRequire('middleware/valid-fields')
const validField = apiRequire('middleware/valid-field')
const hashPassword = apiRequire('middleware/hash-password')

const validUser = validField('user')
const validSingle = validField('order')
const validPrefs = validField('prefs')
const validNote = validField('note')
const validEditOrderParams = validFields(false, [ 'id' ])

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
    .delete('/users',
      banUserHandler
    )
    .get('/orders',
      getOrdersHandler
    )
    .get('/counts',
      getCountsHandler
    )
