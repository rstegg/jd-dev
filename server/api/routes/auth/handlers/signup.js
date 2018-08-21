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
  Thread.create({ title: user.username }, { plain: true })
    .then(thread =>
      !thread ? Promise.reject('Thread not created')
      : { thread, user }
    )

const validate = req =>
  User.findOne({
      where: {
        $or: [
          { email: req.body.user.email },
          { username: req.body.user.username }
        ]
      }
  })
  .then(user =>
      user ?
        Promise.reject('user registered')
        : createThread(req.body.user)
  )

module.exports = (req, res) =>
  validate(req)
    .then(({thread, user}) => {
      const newUser = merge({
        password: user.password,
        ip: getIp(req),
        verified: false,
        permalink: createPermalink(user.email),
        verifyToken: bytes(20),
        threadId: thread.id
      }, pick(['email', 'name', 'username'], user))
      return User.create(newUser, { plain: true })
    })
    .then(createdUser => {
      const { permalink, verifyToken } = createdUser
      const permalink_url = `https://kuwau.com/api/v1/auth/signup/email_confirmation/${permalink}/${verifyToken}`
      const mail = confirmationMail(createdUser, permalink_url)
      sendConfirmation(mail, createdUser)
      const resUser = pick(['id', 'email', 'name', 'username'], createdUser)
      const token = jwt.sign({ id: createdUser.id }, process.env.JWT_SECRET)
      res.status(200).json({user: resUser, token})
      return Thread.update({ owner: createdUser.username }, { where: { id: createdUser.threadId } })
    })
    .catch(error => res.status(400).json({error}))
