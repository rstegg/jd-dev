const { User } = requireDb

module.exports = (req, res, next) =>
  User.findOne({ where: { id: req.user.id, userType: 'admin' }})
  .then(user => !user ? Promise.reject('Unauthorized')
  : next())
  .catch(console.error)
