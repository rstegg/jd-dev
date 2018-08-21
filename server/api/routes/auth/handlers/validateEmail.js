const { User } = requireDb

module.exports = (req, res) =>
  User
    .findOne({ where: { email: req.body.email } })
    .then(user => res.status(200).json({ emailTaken: Boolean(user) }))
    .catch(err => res.status(500).json({error: err.message}))
