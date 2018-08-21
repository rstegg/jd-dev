const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = (req, res, next) =>
  bcrypt.hash(req.body.user.password, saltRounds)
    .then(hash => {
      req.body.user.password = hash
      next()
    })
    .catch((error) => res.status(400).json({ error }))
