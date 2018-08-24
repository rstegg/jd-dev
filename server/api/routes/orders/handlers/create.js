const { Order, Thread } = requireDb
const shortId = require('shortid')

const { map, merge, pick, length } = require('ramda')

const OrderParams = [ 'designers', 'name', 'units', 'type', 'status', 'dueDate', 'caseFileUrls', 'designFileUrls' ]

module.exports = (req, res) => {
  const newOrders = map(order => merge({
    userId: req.user.id,
    unitsCount: length(order.units)
  }, pick(OrderParams, order)), req.body.orders)
  return Order.bulkCreate(newOrders, { plain: true })
  .then(orders => res.status(200).json({ orders }))
  .catch(error => res.status(400).json({ error })) //TODO: return custom error handling
}
