const { User } = requireDb

module.exports = (req, res) => {
    User
      .findOne({ where: { username: req.body.username } })
      .then(user => res.status(200).json({usernameTaken: Boolean(user)}))
      .catch(err => res.status(500).json({error: err.message}))
}
