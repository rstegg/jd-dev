const { User, Order } = requireDb

const validate = req =>
  User.findOne({
    where: { id: req.user.id, userType: 'admin' }
  })
  .then(user =>
      !user ?
        Promise.reject('Unauthorized')
        : user
  )

module.exports = (req, res) =>
  validate(req)
  .then(_ =>
    Order.findOne({ where: { uid: req.params.uid }})
  )
  .then(order => {
    const user = req.user.name
    const oldNotes = order.notes || []
    const newNotes = oldNotes.concat({ user, text: req.body.note })
    return Order.update({ notes: newNotes }, { where: { id: order.id }, returning: true, plain: true })
  })
  .then(order => res.status(200).json({ order }))
  .catch(console.error)
