const router = require('express').Router()
const passport = apiRequire('service/auth')
const { allPass, pipe, path } = require('ramda')

const editProfileHandler = require('./handlers/edit')
const getProfileHandler = require('./handlers/get')

const validateBody = apiRequire('middleware/validate-body')
const validFields = apiRequire('middleware/valid-fields')

const validProfile = validFields('profile', ['name', 'username'])

module.exports =
  router
    .get('/:username',
      getProfileHandler
    )
    .put('/',
      passport.authenticate('jwt', { session: false }),
      validateBody(validProfile),
      editProfileHandler
    )
