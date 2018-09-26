const { User } = requireDb
const jwt = require('jsonwebtoken')

const { pick } = require('ramda')

module.exports = (req, res) => {
  const payload = { id: req.user.id }
  const token = jwt.sign(payload, process.env.JWT_SECRET)
  return User.update({ active: true }, { where: { id: req.user.id }, returning: true, plain: true })
  .then(([_, user]) => res.status(200).json({ user: pick(['email', 'name', 'uid', 'userType'], user), token }))
  .catch(err => res.status(400).json({ error: err }))
}
