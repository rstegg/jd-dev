const { Order, User } = requireDb
const moment = require('moment')

const OrderAttrs = [ 'uid', 'designers', 'name', 'notes', 'units', 'type', 'contact', 'occlusion', 'pontic', 'linerSpacer', 'status', 'dueDate', 'dueTime', 'caseFileUrls', 'designFileUrls', 'createdAt', 'updatedAt' ]
const userAttributes = [ 'uid', 'name', 'email', 'image', 'active' ]

module.exports = (req, res) =>
  Promise.all([
    Order.count({
      where: { userId: req.user.id, status: 'processed', dueDate: { $gt: moment().subtract(1, 'days').toISOString() } }
    }),
    Order.count({
      where: { userId: req.user.id, status: 'completed', dueDate: { $gt: moment().subtract(1, 'days').toISOString() } }
    }),
    Order.count({
      where: { userId: req.user.id, status: 'canceled', dueDate: { $gt: moment().subtract(1, 'days').toISOString() } }
    }),
    Order.count({
      where: { userId: req.user.id, dueDate: { $gt: moment().subtract(1, 'days').toISOString() } }
    })
  ])
  .then(([processedOrders, completedOrders, canceledOrders, newOrders]) => res.status(200).json({ processedOrders, completedOrders, canceledOrders, newOrders }))
  .catch(error => res.status(400).json({ error }))
