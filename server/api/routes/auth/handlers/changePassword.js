const { User } = requireDb
const bcrypt = require('bcryptjs')
const saltRounds = 10

const validate = req =>
  User.findOne({ where: { id: req.user.id } })
  .then(user => user.validPassword(req.body.user.oldPassword))
  .then(validPassword => !validPassword ? Promise.reject('bad password') : Promise.resolve())


module.exports = (req, res, next) =>
  validate(req)
  .then(user => bcrypt.hash(req.body.user.newPassword, saltRounds))
  .then(hash => User.update({ password: hash }, { where: { id: req.user.id }, returning: true, plain: true }))
  .then(([_, user]) => res.status(200).json({ user }))
  .catch((error) => res.status(400).json({ error }))
