const { Order } = requireDb

const authorize = req =>
  Order.findOne({ where: { uid: req.params.uid }})
  .then(order => !order ?
    Promise.reject('no order found')
    : order
  )

module.exports = (req, res) => {
  Order.findOne({ where: { uid: req.params.uid }})
  .then(order => {
    const newScanFiles = order.caseFileUrls.concat(req.file.location)
    return Order.update({ caseFileUrls: newScanFiles }, { where: { id: order.id, userId: req.user.id }, returning: true, plain: true })
  })
  .then(order => res.status(200).json({ file: req.file.location }))
  .catch(console.error)
}
