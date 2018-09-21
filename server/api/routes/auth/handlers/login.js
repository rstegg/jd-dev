const jwt = require('jsonwebtoken')

const { pick } = require('ramda')

module.exports = (req, res) => {
  const payload = { id: req.user.id }
  const token = jwt.sign(payload, process.env.JWT_SECRET)
  const resUser = pick(['email', 'name', 'uid', 'userType'], req.user)
  res.json({ user: resUser, token: token })
}
