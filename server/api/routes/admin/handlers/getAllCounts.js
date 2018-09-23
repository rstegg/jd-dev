const { User } = requireDb
const moment = require('moment')

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
    .then(_ => Promise.all([
      User.count(), Order.count(), User.count({ where: { userType: 'designer' } }), Order.count({ where: { dueDate: { $lt: moment() }  } })
    ]))
    .then(([userCount, orderCount, designerCount, finishedOrderCount]) => res.status(200).json({ userCount, orderCount, designerCount, finishedOrderCount }))
    .catch(error => res.status(400).json({ error }))
