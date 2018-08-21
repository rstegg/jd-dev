const { Product, Thread } = requireDb
const shortId = require('shortid')

const { merge, pick } = require('ramda')

const ProductParams = [ 'id', 'name', 'slug', 'isPublic', 'description', 'gallery', 'layout', 'themes', 'category', 'subCategory', 'price', 'image' ]

const defaultTheme = {
  rgb: {
    r: 255,
    g: 255,
    b: 255,
    a: 1
  }
}

const defaultFontTheme = {
  rgb: {
    r: 0,
    g: 0,
    b: 0,
    a: 1
  }
}

const defaultThemes = {
  primary: defaultTheme,
  secondary: defaultTheme,
  background: defaultTheme,
  segment: defaultTheme,
  font: defaultFontTheme,
}

const getValidSlug = (slug, userId, thread) =>
  new Promise(resolve =>
    Product.findOne({
      where: { slug, userId }
    })
    .then(product =>
      product ?
        resolve(getValidSlug(`${slug}-${shortId.generate().slice(0,1)}`, userId, thread))
        : resolve({ slug, thread })
    )
  )

const createThread = (user, slug) =>
  Thread.create({ title: slug, owner: user.username }, { plain: true })
    .then(thread =>
      !thread ? Promise.reject('Thread not created')
      : getValidSlug(slug, user.id, thread)
    )

const validate = req => {
  const slug =
    req.body.product.name
      .replace("'", '')
      .replace(/[^a-z0-9]/gi, '-')
      .toLowerCase()
      .trim()

  return createThread(req.user, slug)
}

module.exports = (req, res) =>
  validate(req)
    .then(({ slug, thread }) => {
      const newProduct = merge({
        slug,
        themes: defaultThemes,
        threadId: thread.id,
        userId: req.user.id,
        username: req.user.username,
      }, pick(ProductParams, req.body.product))
      return Product.create(newProduct, { plain: true })
    })
    .then(product => res.status(200).json({ product }))
    .catch(error => res.status(400).json({ error })) //TODO: return custom error handling
