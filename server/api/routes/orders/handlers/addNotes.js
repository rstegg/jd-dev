const { Order } = requireDb

module.exports = (req, res) =>
  Order.findOne({ where: { uid: req.params.uid }})
  .then(order => {
    console.log(req.user);
    const user = req.user.name
    const newNotes = order.notes.concat({ user, text: req.body.note })
    return Order.update({ notes: newNotes }, { where: { id: order.id, userId: req.user.id }, returning: true, plain: true })
  })
  .then(order => res.status(200).json({ order }))
  .catch(console.error)
