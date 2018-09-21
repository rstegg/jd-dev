const { Order } = requireDb

module.exports = (req, res) =>
  Order.findOne({ where: { uid: req.params.uid }})
  .then(order => {
    const user = req.user.name
    const newNotes = order.notes.concat({ user, text: req.body.note })
    return Order.update({ notes: newNotes }, { where: { id: order.id, $or: { userId: req.user.id, designerId: req.user.uid } }, returning: true, plain: true })
  })
  .then(order => res.status(200).json({ order }))
  .catch(console.error)
