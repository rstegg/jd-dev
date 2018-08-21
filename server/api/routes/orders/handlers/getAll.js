const { Product } = requireDb

const ProductAttrs = [ 'id', 'name', 'slug', 'isPublic', 'description', 'gallery', 'layout', 'themes', 'category', 'subCategory', 'price', 'image', 'userId' ]

module.exports = (req, res) =>
  Product.findAll({
    include: [{
      model: Shop,
      attributes: [ 'image', 'name', 'slug' ]
    }],
    where: { userId: req.params.userId },
    attributes: ProductAttrs
  })
  .then(products => res.status(200).json({ products }))
  .catch(error => res.status(400).json({ error }))
