const { User } = requireDb
const { merge, pick } = require('ramda')

const userAttributes = ['id', 'stripeCards', 'stripeCustomer']

const validate = req =>
  User.findOne({
    where: { id: req.user.id },
    attributes: userAttributes
  })
  .then(user =>
      !user ?
          Promise.reject('invalid user')
          : user
  )

module.exports = (req, res) =>
  validate(req)
    .then(({stripeCards, stripeCustomer}) => res.status(200).json({stripeCards, stripeCustomer}))
    .catch(error => res.status(400).json({error}))
