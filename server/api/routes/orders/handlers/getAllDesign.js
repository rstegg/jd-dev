const { Order, User } = requireDb

const OrderAttrs = [ 'uid', 'designers', 'name', 'notes', 'units', 'type', 'contact', 'occlusion', 'pontic', 'linerSpacer', 'status', 'dueDate', 'dueTime', 'scanFileUrls', 'designFileUrls', 'createdAt', 'updatedAt' ]
const userAttributes = [ 'uid', 'name', 'email', 'image', 'active' ]

module.exports = (req, res) =>
  Order.findAll({
    include: [{ model: User, attributes: userAttributes }],
    where: { designerId: req.user.uid },
    attributes: OrderAttrs
  })
  .then(orders => res.status(200).json({ orders }))
  .catch(error => res.status(400).json({ error }))
