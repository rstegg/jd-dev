const { Order, Thread } = requireDb
const shortId = require('shortid')
const uuid = require('uuid/v4')

const { map, merge, pick, length } = require('ramda')

const OrderParams = [ 'uid', 'designers', 'name', 'units', 'type', 'status', 'dueDate', 'caseFileUrls', 'designFileUrls' ]

module.exports = (req, res) => {
  const newOrders = map(order => merge({
    userId: req.user.id,
    unitsCount: length(order.units),
    uid: uuid()
  }, pick(OrderParams, order)), req.body.orders)
  const validatedTypes = newOrders.map(order => ({
    ...order,
    caseFileUrls: [ order.caseFileUrls ]
  }))
  return Order.bulkCreate(validatedTypes, { plain: true })
  .then(orders => res.status(200).json({ orders }))
  .catch(error => {
    console.log(error);
    res.status(400).json({ error })
  }) //TODO: return custom error handling
}
