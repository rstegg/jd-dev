const { Order } = requireDb

const authorize = req =>
  Order.findOne({ where: { uid: req.params.uid }})
  .then(order => !order ?
    Promise.reject('no order found')
    : order
  )

module.exports = (req, res) =>
  Order.findOne({ where: { uid: req.params.uid }})
  .then(order => {
    const oldScanFiles = order.scanFileUrls || []
    const newScanFiles = oldScanFiles.concat(req.file.location)
    return Order.update({ scanFileUrls: newScanFiles }, { where: { id: order.id }, returning: true, plain: true })
  })
  .then(order => res.status(200).json({ file: req.file.location }))
  .catch(console.error)
