const { Order } = requireDb

module.exports = (req, res) =>
  Order.findOne({ where: { uid: req.params.uid }})
  .then(order => {
    const { contact, occlusion, pontic, linerSpacer } = order
    const newNotes = order.notes.concat(req.body.prefs)
    return Order.update({ contact: req.body.prefs.contact, occlusion: req.body.prefs.occlusion, pontic: req.body.prefs.pontic, linerSpacer: req.body.prefs.linerSpacer },
      { where: { id: order.id, userId: req.user.id }, returning: true, plain: true
    })
  })
  .then(order => res.status(200).json({ order }))
  .catch(console.error)
