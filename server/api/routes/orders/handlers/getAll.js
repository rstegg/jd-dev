const { Order } = requireDb

const OrderAttrs = [ 'uid', 'designers', 'name', 'units', 'type', 'contact', 'occlusion', 'pontic', 'linerSpacer', 'status', 'dueDate', 'dueTime', 'caseFileUrls', 'designFileUrls', 'createdAt' ]

module.exports = (req, res) =>
  Order.findAll({
    where: { userId: req.user.id },
    attributes: OrderAttrs
  })
  .then(orders => res.status(200).json({ orders }))
  .catch(error => res.status(400).json({ error }))
