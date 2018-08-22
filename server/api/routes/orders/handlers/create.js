const { Order, Thread } = requireDb
const shortId = require('shortid')

const { merge, pick, length } = require('ramda')

const OrderParams = [ 'designers', 'name', 'units', 'unitsCount', 'type', 'status', 'dueDate', 'caseFileUrls', 'designFileUrls' ]

const getValidSlug = (slug, userId, thread) =>
  new Promise(resolve =>
    Order.findOne({
      where: { slug, userId }
    })
    .then(product =>
      product ?
        resolve(getValidSlug(`${slug}-${shortId.generate().slice(0,1)}`, userId, thread))
        : resolve({ slug, thread })
    )
  )

const createThread = (user, slug) =>
  Thread.create({ title: slug, owner: user.email }, { plain: true })
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
      const newOrder = merge({
        userId: req.user.id,
        unitsCount: length(req.body.order.units)
      }, pick(OrderParams, req.body.order))
      return Order.create(newOrder, { plain: true })
    })
    .then(product => res.status(200).json({ product }))
    .catch(error => res.status(400).json({ error })) //TODO: return custom error handling
