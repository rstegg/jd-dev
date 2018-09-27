const { Order, User } = requireDb
const moment = require('moment')

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
    .then(_ => Promise.all([
      User.count(),
      Order.count(),
      User.count({ where: { userType: 'designer', active: true } }),
      Order.count({ where: { dueDate: { $lt: moment().toISOString() }  } })
    ]))
    .then(([userCount, orderCount, designerCount, finishedOrderCount]) => res.status(200).json({ userCount, orderCount, designerCount, finishedOrderCount }))
    .catch(error => res.status(400).json({ error }))
