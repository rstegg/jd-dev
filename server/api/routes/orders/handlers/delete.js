const { Order } = requireDb

module.exports = (req, res) =>
  Order.destroy({ where: { uid: req.body.order.uid, userId: req.user.id } })
    .then(order => {
      res.status(200).json({ order })
    })
    .catch(errror => res.status(400).json({ error }))
