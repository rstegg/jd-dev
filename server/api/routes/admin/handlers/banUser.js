const { User } = requireDb

const UserAttrs = [ 'email', 'name', 'uid', 'userType', 'banned' ]

const validate = req =>
  User.findOne({
    where: { id: req.user.id, userType: 'admin' }
  })
  .then(user =>
      !user ?
        Promise.reject('Unauthorized')
        : user
  )

module.exports = (req, res) =>
  validate(req)
  .then(_ =>
    User.update({ banned: true }, { where: { uid: req.body.user.uid }, returning: true, plain: true })
  )
  .then(([_, user]) => User.findAll({ attributes: UserAttrs }))
  .then(users => res.status(200).json({ users }))
  .catch(errror => res.status(400).json({ error }))
