const { Order } = requireDb

module.exports = (req, res) =>
  Order.update({ status: 'canceled' }, { where: { uid: req.body.order.uid, userId: req.user.id } })
    .then(order => {
      res.status(200).json({ order })
    })
    .catch(errror => res.status(400).json({ error }))
