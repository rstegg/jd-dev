const { Product } = requireDb
const { length } = require('ramda')

module.exports = (req, res) => {
  const { index } = req.params

  Product.findOne({ where: { id: req.params.id, userId: req.params.profileId, userId: req.user.id } })
    .then(product => {
      const { gallery } = product
      const updatedGallery = { gallery: [...product.gallery.slice(0, index), req.file.location, ...product.gallery.slice(index + 1)] }
      Product.update(
        updatedGallery,
        { where: { id: req.params.id, userId: req.params.profileId, userId: req.user.id },
        returning: true,
        plain: true
        }
     )
     .then(product => res.status(200).json({image: req.file.location, index: req.params.index}))
     .catch(error => res.status(400).json({error}))
  })
  .catch(error => res.status(400).json({error}))
}
