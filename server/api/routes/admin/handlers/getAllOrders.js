const { User, Order } = requireDb

const UserAttrs = [ 'email', 'name', 'uid', 'userType' ]
const OrderAttrs = [ 'uid', 'designers', 'name', 'notes', 'units', 'type', 'contact', 'occlusion', 'pontic', 'linerSpacer', 'status', 'dueDate', 'dueTime', 'scanFileUrls', 'designFileUrls', 'createdAt', 'updatedAt' ]

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
      Order.findAll({
        include: [{ model: User, attributes: UserAttrs }],
        attributes: OrderAttrs
      })
    )
    .then(orders => res.status(200).json({ orders }))
    .catch(error => res.status(400).json({ error }))
