const { User } = requireDb
const jwt = require('jsonwebtoken')

const crypto = require('crypto')
const mailcomposer = require('mailcomposer')
const shortId = require('shortid')
const uuid = require('uuid/v4')

const { resetPasswordMail, sendPasswordReset } = apiRequire('service/mail')

const validate = req =>
  User.findOne({ where: { email: req.body.user.email } })
  .then(user =>
    !user ? Promise.reject('bad user')
    : user
  )

const bytes = n => crypto.randomBytes(n).toString('hex')

const createPermalink = (email) =>
    `${email}${bytes(4)}`
        .toLowerCase()
        .replace(' ', '')
        .replace(/[^\w\s]/gi, '')
        .trim()


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
      const permalink_url = `https://jawdrop.io/reset/${resetPermalink}/${resetVerifyToken}`
      const mail = resetPasswordMail(updatedUser, permalink_url)
      sendPasswordReset(mail, updatedUser)
      return res.status(200).json({ user: updatedUser })
    })
  .catch((error) => res.status(400).json({ error }))
