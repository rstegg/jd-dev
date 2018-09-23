const { Order, Thread } = requireDb
const shortId = require('shortid')
const uuid = require('uuid/v4')

const { map, merge, pick, length, prop, head } = require('ramda')

const OrderParams = [ 'designers', 'name', 'units', 'type', 'contact', 'occlusion', 'pontic', 'linerSpacer', 'status', 'dueDate', 'dueTime', 'caseFileUrls', 'designFileUrls' ]

const createThread = order =>
  Thread.create({ title: order.name, uid: order.uid }, { plain: true })
    .then(thread =>
      !thread ? Promise.reject('Thread not created')
      : thread
    )

module.exports = (req, res, next) => {
  const newOrders = map(order => merge({
    userId: req.user.id,
    unitsCount: length(order.units),
    uid: uuid(),
    notes: order.notes && length(order.notes) ? map(note => ({ text: note, user: req.user.name }), order.notes) : null
  }, pick(OrderParams, order)), req.body.orders)
  const validatedTypes = newOrders.map(order => ({
    ...order,
    caseFileUrls: [ order.caseFileUrls ],
    notes: order.notes && length(prop('text', head(order.notes))) ? order.notes : null
  }))
  return Order.bulkCreate(validatedTypes, { plain: true })
  .then(orders => {
    orders.map(createThread)
    req.orders = orders
    res.status(200).json({ orders })
    next()
  })
  .catch(error => {
    console.log(error);
    res.status(400).json({ error })
  }) //TODO: return custom error handling
}
