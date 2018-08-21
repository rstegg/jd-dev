const router = require('express').Router()
const passport = apiRequire('service/auth')
const { allPass, pipe, path, prop } = require('ramda')

const loginHandler = require('./handlers/login')
const signupHandler = require('./handlers/signup')
const validateEmailHandler = require('./handlers/validateEmail')
const validateUsernameHandler = require('./handlers/validateUsername')
const verifyTokenHandler = require('./handlers/verifyToken')

const validateBody = apiRequire('middleware/validate-body')
const validFields = apiRequire('middleware/valid-fields')
const hashPassword = apiRequire('middleware/hash-password')

const validSignupUser = validFields('user', ['name', 'email', 'username', 'password'])

module.exports =
  router
    .post(`/login`,
      passport.authenticate('local', { session: false }),
      loginHandler
    )
    .post(`/signup`,
      validateBody(validSignupUser),
      hashPassword,
      signupHandler
    )
   .post(`/signup/validate_email`,
      validateBody(prop('email'), 'missing email'),
      validateEmailHandler
    )
    .post(`/signup/validate_username`,
      validateBody(prop('username'), 'missing username'),
      validateUsernameHandler
    )
    .get(`/signup/email_confirmation/:permalink/:verifyToken`,
      verifyTokenHandler
    )
