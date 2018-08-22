const { Order } = requireDb

const OrderAttrs = [ 'designers', 'name', 'units', 'unitsCount', 'type', 'status', 'dueDate', 'caseFileUrls', 'designFileUrls' ]

module.exports = (req, res) =>
  Order.findAll({
    where: { userId: req.params.userId },
    attributes: OrderAttrs
  })
  .then(orders => res.status(200).json({ orders }))
  .catch(error => res.status(400).json({ error }))
