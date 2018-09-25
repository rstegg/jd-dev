const { User } = requireDb
const jwt = require('jsonwebtoken')

const crypto = require('crypto')
const mailcomposer = require('mailcomposer')
const shortId = require('shortid')
const uuid = require('uuid/v4')

const { confirmationMail, sendConfirmation } = apiRequire('service/mail')

const validate = req =>
  User.findOne({ where: { email: req.body.email } })
  .then(user =>
    !user ? Promise.reject('bad user')
    : user
  )


module.exports = (req, res, next) =>
  validate(req)
  .then(user => {
      const updatedUser = {
        resetPermalink: createPermalink(user.email),
        resetVerifyToken: bytes(20),
      }
      return User.update(updatedUser, { where: { id: user.id }, returning: true, plain: true })
    })
    .then(([_, updatedUser]) => {
      const { resetPermalink, resetVerifyToken } = updatedUser
      const permalink_url = `https://jawdrop.io/api/v1/auth/password/reset_password/${resetPermalink}/${resetVerifyToken}`
      const mail = resetPasswordMail(updatedUser, permalink_url)
      sendPasswordReset(mail, updatedUser)
      return res.status(200)
    })
  .catch((error) => res.status(400).json({ error }))
