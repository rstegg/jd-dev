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
    const oldDesignFiles = order.designFileUrls || []
    const newDesignFiles = oldDesignFiles.concat(req.file.location)
    return Order.update({ designFileUrls: newDesignFiles }, { where: { id: order.id, designerId: req.user.uid }, returning: true, plain: true })
  })
  .then(order => res.status(200).json({ file: req.file.location }))
  .catch(console.error)
}
