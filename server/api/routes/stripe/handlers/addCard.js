const { User } = requireDb
const stripe = apiRequire('service/stripe')

const { allPass, path, pick, pipe, merge, isNil } = require('ramda')

const validField = p => obj => !isNil(path([p], obj))

// const validBraintreeResponse = pipe(
//     path(['body', 'account']),
//     allPass([
//         validField('name'),
//         validField('username')
//     ]))

const validate = req => {
  // if (!validBraintreeResponse(req)) return Promise.reject('invalid stripe response')

  return User.findOne({
      where: { id: req.user.id },
      plain: true
  })
  .then(user =>
      !user ? Promise.reject('invalid user')
      : user
  )
}

const findOrCreateStripeCustomer = (user, stripeToken) => {
  if (!user.stripeCustomer) {
    stripe.customers.create({
      description: `Customer for ${user.username}`,
      source: stripeToken
    })
    .then(res => res)
  } else {
    stripe.customers.update(user.stripeCustomer.id, {
      source: stripeToken
    })
    .then(res => res)
  }
}

module.exports = (req, res) =>
  validate(req)
    .then(validatedUser => findOrCreateStripeCustomer(validatedUser, req.body.stripeResponse.id))
      .then(customer => {
        const new_stripe_card = req.body.stripeResponse.card
        const old_stripeCards = req.user.stripeCards || []
        const updated_stripe = { stripeCards: old_stripeCards.concat(new_stripe_card), stripeCustomer: customer }
        return User.update(updated_stripe, { where: { id: req.user.id }, returning: true, plain: true })
      })
      .then(user => {
        const stripe_card = req.body.stripeResponse.card
        res.status(200).json({stripe_card})
      })
    .catch(error => res.status(400).json({error}))
