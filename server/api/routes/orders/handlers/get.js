const { Product, User, Thread } = requireDb
const { curry } = require('ramda')

const ProductAttrs = [
  'id',
  'name',
  'slug',
  'isPublic',
  'description',
  'gallery',
  'layout',
  'themes',
  'category',
  'subCategory',
  'price',
  'image',
  'userId'
]

const ProductAssociations = [
  {
    model: User,
    attributes: ['id', 'username', 'image']
  },
  {
    model: Thread,
    attributes: ['id', 'name', 'owner']
  }
]

const getProductBySlug = slug =>
  Product.findOne({
    include: ProductAssociations,
    where: { slug },
    attributes: ProductAttrs
  })
  .then(product =>
    !product ? Promise.reject('Invalid product id')
    : product
  )

module.exports = (req, res) =>
  getProductBySlug(req.params.id)
  .then(product => res.status(200).json({ product }))
  .catch(error => res.status(400).json({ error }))
