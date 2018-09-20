const { Order } = requireDb

module.exports = (req, res) =>
  Order.findOne({ where: { uid: req.params.uid }})
  .then(order => {
    const { contact: oldContact, occlusion: oldOcclusion, pontic: oldPontic, linerSpacer: oldLinerSpacer } = order
    const { contact: newContact, occlusion: newOcclusion, pontic: newPontic, linerSpacer: newLinerSpacer } = req.body.prefs
    const newPrefs = { contact: newContact || oldContact, occlusion: newOcclusion || oldOcclusion, pontic: newPontic || oldPontic, linerSpacer: newLinerSpacer || oldLinerSpacer }
    const newNotes = order.notes.concat(req.body.prefs)
    return Order.update({ contact: req.body.prefs.contact, occlusion: req.body.prefs.occlusion, pontic: req.body.prefs.pontic, linerSpacer: req.body.prefs.linerSpacer },
      { where: { id: order.id, userId: req.user.id }, returning: true, plain: true
    })
  })
  .then(order => res.status(200).json({ order }))
  .catch(console.error)
