const router = require('express').Router()
const passport = apiRequire('service/auth')
const { allPass, pipe, path, prop, tap } = require('ramda')

const loginHandler = require('./handlers/login')
const signupHandler = require('./handlers/signup')
const validateEmailHandler = require('./handlers/validateEmail')
const verifyTokenHandler = require('./handlers/verifyToken')
const changePasswordHandler = require('./handlers/changePassword')
const requestResetPasswordHandler = require('./handlers/requestReset')
// const verifyResetPasswordHandler = require('./handlers/verifyReset')

const validateBody = apiRequire('middleware/validate-body')
const validFields = apiRequire('middleware/valid-fields')
const hashPassword = apiRequire('middleware/hash-password')

const validSignupUser = validFields('user', ['email', 'name', 'password'])
const validLoginUser = validFields('', ['email', 'password'])
const validChangePassword = validFields('user', ['oldPassword', 'newPassword'])

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
    .get(`/signup/email_confirmation/:permalink/:verifyToken`,
      verifyTokenHandler
    )
    .post(`/change_password`,
      passport.authenticate('jwt', { session: false }),
      validateBody(validChangePassword),
      changePasswordHandler
     )
    .post(`/password/request_reset`,
      passport.authenticate('jwt', { session: false }),
      validateBody(validChangePassword),
      requestResetPasswordHandler
     )
    .post(`/password/reset_password/:permalink/:verifyToken`,
      passport.authenticate('jwt', { session: false }),
      validateBody(validChangePassword),
      // verifyResetPasswordHandler
     )
