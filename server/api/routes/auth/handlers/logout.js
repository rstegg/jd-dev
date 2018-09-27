const { User } = requireDb
const jwt = require('jsonwebtoken')

const { pick } = require('ramda')

module.exports = (req, res) =>
  User.update({ active: false }, { where: { id: req.user.id }} )
  .then(() => res.status(200))
  .catch(err => res.status(400))
