const { User } = requireDb
const jwt = require('jsonwebtoken')

const userAttributes = ['id', 'username', 'image']

const validate = id =>
  User.findOne({ where: { id }})
  .then(user =>
    !user ? Promise.reject('bad user')
    : user
  )

const socketDisconnect = (io, socket, action) => {
  validate(socket.userId)
    .then(user =>
      User.update({ active: false }, { where: { id: user.id }, returning: true, plain: true })
    )
    .then(([_, user]) => console.log('Socket disconnect', user.id))
    .catch(err => console.log(err))
}

module.exports = { socketDisconnect }
