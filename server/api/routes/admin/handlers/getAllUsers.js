const { User } = requireDb

const UserAttrs = [ 'email', 'name', 'uid', 'userType', 'disabled' ]

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
      User.findAll({
        where: { userType: { $ne: 'admin' } },
        attributes: UserAttrs
      })
    )
    .then(users => res.status(200).json({ users }))
    .catch(error => res.status(400).json({ error }))
