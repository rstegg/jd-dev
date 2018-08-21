const { User, Product, Thread } = requireDb
const { merge, pick } = require('ramda')

const ThreadAttributes = [ 'id', 'name', 'owner' ]
const ProfileAttributes = [ 'id', 'name', 'username', 'image', 'bio', 'website' ]
const ResProfileAttributes = [ 'id', 'name', 'username', 'image', 'bio', 'website', 'thread' ]
const ProductAttributes = [ 'id', 'name', 'username', 'description', 'isPublic', 'slug', 'image' ]

const getProducts = user =>
  Product.findAll({
    where: { userId: user.id },
    attributes: ProductAttributes
  })
  .then(products => merge({ products }, pick(ResProfileAttributes, user)))

const validate = req =>
  User.findOne({
    include: [
      {
        model: Thread,
        attributes: ThreadAttributes
      }
    ],
    where: { username: req.params.username },
    attributes: ProfileAttributes
  })
  .then(user =>
      !user ?
          Promise.reject('invalid username')
          : getProducts(user)
  )

module.exports = (req, res) =>
  validate(req)
    .then(profile => res.status(200).json({ profile }))
    .catch(error => res.status(400).json({ error }))
