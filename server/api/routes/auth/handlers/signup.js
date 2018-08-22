const { User, Thread } = requireDb
const jwt = require('jsonwebtoken')

const crypto = require('crypto')
const mailcomposer = require('mailcomposer')
const shortId = require('shortid')

const { confirmationMail, sendConfirmation } = apiRequire('service/mail')

const { allPass, not, merge, path, pick, pipe, reduceWhile } = require('ramda')

const bytes = n => crypto.randomBytes(n).toString('hex')

const ipFields = [
  ['ip'],
  ['headers', 'x-forwarded-for'],
  ['connection', 'remoteAddress'],
  ['socket', 'remoteAddress'],
  ['connection', 'socket', 'remoteAddress']
]

const getIp = (req) => reduceWhile(not, (acc, p) => path(p, req), '', ipFields) || ''

const createPermalink = (email) =>
    `${email}${bytes(4)}`
        .toLowerCase()
        .replace(' ', '')
        .replace(/[^\w\s]/gi, '')
        .trim()

const createThread = user =>
  Thread.create({ title: user.name }, { plain: true })
    .then(thread =>
      !thread ? Promise.reject('Thread not created')
      : { thread, user }
    )

const validate = req =>
  User.findOne({
    where: { email: req.body.user.email }
  })
  .then(user =>
      user ?
        Promise.reject('email registered')
        : createThread(req.body.user)
  )

module.exports = (req, res) =>
  validate(req)
    .then(({thread, user}) => {
      const newUser = merge({
        password: user.password,
        ip_address: getIp(req),
        verified: false,
        permalink: createPermalink(user.email),
        verify_token: bytes(20),
        threadId: thread.id
      }, pick(['email', 'name'], user))
      return User.create(newUser, { plain: true })
    })
    .then(createdUser => {
      const { permalink, verify_token } = createdUser
      const permalink_url = `https://freecontour.com/api/v1/auth/signup/email_confirmation/${permalink}/${verify_token}`
      const mail = confirmationMail(createdUser, permalink_url)
      sendConfirmation(mail, createdUser)
      const resUser = pick(['email', 'email'], createdUser)
      const token = jwt.sign({ id: createdUser.id }, process.env.JWT_SECRET)
      return res.status(200).json({user: resUser, token})
    })
    .catch(error => res.status(400).json({ error }))
