const { User, Thread } = requireDb
const jwt = require('jsonwebtoken')

const crypto = require('crypto')
const mailcomposer = require('mailcomposer')
const shortId = require('shortid')
const uuid = require('uuid/v4')

const { confirmationMail, sendConfirmation } = apiRequire('service/mail')

const { merge, pick, reduceWhile, not, path } = require('ramda')

const ipFields = [
  ['ip'],
  ['headers', 'x-forwarded-for'],
  ['connection', 'remoteAddress'],
  ['socket', 'remoteAddress'],
  ['connection', 'socket', 'remoteAddress']
]

const getIp = (req) => reduceWhile(not, (acc, p) => path(p, req), '', ipFields) || ''

const bytes = n => crypto.randomBytes(n).toString('hex')

const createPermalink = (email) =>
    `${email}${bytes(4)}`
        .toLowerCase()
        .replace(' ', '')
        .replace(/[^\w\s]/gi, '')
        .trim()

const validate = req =>
  User.findOne({
    where: { id: req.user.id, userType: 'admin' }
  })
  .then(user =>
      !user ?
        Promise.reject('Unauthorized')
        : user
  )

module.exports = (req, res) =>
  validate(req)
    .then(_ => {
      const { user } = req.body
      const newUser = merge({
        password: user.password,
        verified: user.verified || false,
        permalink: createPermalink(user.email),
        ipAddress: getIp(req),
        verifyToken: bytes(20),
        userType: user.userType || 'individual',
        uid: uuid()
      }, pick(['email', 'name'], user))
      return User.create(newUser, { plain: true })
    })
    .then(createdUser => {
      const { permalink, verifyToken } = createdUser
      const permalink_url = `https://jawdrop.io/api/v1/auth/signup/email_confirmation/${permalink}/${verifyToken}`
      const mail = confirmationMail(createdUser, permalink_url)
      sendConfirmation(mail, createdUser)
      const resUser = pick(['name', 'email', 'uid', 'userType'], createdUser)
      const token = jwt.sign({ id: createdUser.id }, process.env.JWT_SECRET)
      return res.status(200).json({user: resUser, token})
    })
    .catch(error => res.status(400).json({ error }))
