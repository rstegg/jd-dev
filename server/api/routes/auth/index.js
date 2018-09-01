const router = require('express').Router()
const passport = apiRequire('service/auth')
const { allPass, pipe, path, prop, tap } = require('ramda')

const loginHandler = require('./handlers/login')
const signupHandler = require('./handlers/signup')
const validateEmailHandler = require('./handlers/validateEmail')
const verifyTokenHandler = require('./handlers/verifyToken')

const validateBody = apiRequire('middleware/validate-body')
const validFields = apiRequire('middleware/valid-fields')
const hashPassword = apiRequire('middleware/hash-password')

const validSignupUser = validFields('user', ['email', 'name', 'password'])
const validLoginUser = validFields('', ['email', 'password'])

const logger = tap(console.log)

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
    .get(`/signup/email_confirmation/:permalink/:verify_token`,
      verifyTokenHandler
    )
