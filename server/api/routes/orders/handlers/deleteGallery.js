const { Product } = requireDb
const { view, lensIndex, prop } = require('ramda')

const getGallery = prop('gallery')

module.exports = (req, res) =>
  Product.findOne({ where: { id: req.params.id, userId: req.params.userId, userId: req.user.id } })
    .then(product =>
      !product ? Promise.reject('Invalid permission')
      : product
    )
    .then(product => {
      const reqIndexLens = lensIndex(req.params.index)
      const hasIndex = view(reqIndexLens, getGallery(product))
      if (!hasIndex) {
        return res.status(200).json({product})
      }
      const updatedGallery = { gallery: [...product.gallery.slice(0, req.params.index), ...product.gallery.slice(req.params.index + 1)] }
      Product.update(updatedGallery, { where: { id: req.params.id, userId: req.params.userId, userId: req.user.id } })
        .then(product => res.status(200).json({product}))
        .catch(error => res.status(400).json({error}))
    })
    .catch(error => res.status(400).json({error}))
