const { Order } = requireDb
const { path, prop, pipe } = require('ramda')

const orderUid = path(['body', 'order', 'uid'])

const userId = path(['user', 'id'])

const validate = req =>
  Order.findOne({ where: { uid: orderUid(req) }})
  .then(order => !order ? Promise.reject('bad order')
    : order)

module.exports = (req, res) =>
  validate(req)
    .then(order =>
      Order.update({ status: 'canceled' }, { where: { uid: orderUid(req), userId: userId(req) } })
    )
    .then(order => {
      res.status(200).json({ order })
    })
    .catch(errror => res.status(400).json({ error }))
