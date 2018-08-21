const models = requireDb
const { User } = models
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
        const new_stripe_bank = req.body.stripeResponse.bank
        const old_stripeBanks = req.user.stripeBanks || []
        const updated_stripe = { stripeBanks: old_stripeBanks.concat(new_stripe_bank), stripeCustomer: customer }
        return User.update(updated_stripe, { where: { id: req.user.id }, returning: true, plain: true })
      })
      .then(user => {
        const stripe_bank = req.body.stripeResponse.bank
        res.status(200).json({stripe_bank})
      })
    .catch(error => res.status(400).json({error}))
