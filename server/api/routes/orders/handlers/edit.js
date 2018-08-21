const { Product } = requireDb

const shortId = require('shortid')

const { merge, pick } = require('ramda')

const updateProductParams = ['name', 'isPublic', 'description', 'layout', 'category', 'subCategory', 'price', 'image']
const productParams = ['id', 'name', 'slug', 'isPublic', 'description', 'gallery', 'layout', 'themes', 'category', 'subCategory', 'price', 'image', 'userId']

const getValidSlug = (slug, userId, productId) =>
  new Promise(resolve =>
    Product.findOne({
      where: { slug, userId, id: { $ne: productId } }
    })
    .then(product =>
      product ?
        resolve(getValidSlug(`${slug}-${shortId.generate().slice(0,1)}`), userId, productId)
        : resolve(slug)
    )
  )

const getValidParams = (productId, userId, slug) =>
  Product.findOne({
    where: { id: productId, userId }
  })
  .then(shop =>
    !shop ? Promise.reject('Invalid permission')
    : getValidSlug(slug, userId, productId)
  )

const validate = req => {
  const slug =
    req.body.product.name
      .replace("'", '')
      .replace(/[^a-z0-9]/gi, '-')
      .toLowerCase()
      .trim()

  return getValidParams(req.params.id, req.user.id, slug)
}

module.exports = (req, res) =>
  validate(req)
    .then(slug => {
      const updatedProduct = merge({
        slug
      }, pick(updateProductParams, req.body.product))
      return Product.update(updatedProduct, { where: { id: req.params.id, userId: req.params.userId, userId: req.user.id }, returning: true, plain: true })
    })
    .then(savedProduct => {
      const product = pick(productParams, savedProduct[1])
      res.status(200).json({ product })
    })
    .catch(error => res.status(400).json({ error }))
