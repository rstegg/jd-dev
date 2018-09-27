const { User } = requireDb

module.exports = (req, res) =>
  User.update(
    { image: req.file.location },
    { where: { uid: req.body.user.uid },
    returning: true,
    plain: true
  })
  .then(profile => res.status(200).json({image: req.file.location}))
  .catch(error => res.status(400).json({error}))
