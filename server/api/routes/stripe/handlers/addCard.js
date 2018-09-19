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

const findOrCreateStripeCustomer = (user, stripeObj) => {
  if (!user.stripeCustomer) {
    console.log('CREATING STRIPE CUSTOMER');
    return stripe.customers.create({
      description: `Customer for ${user.email}`,
      source: stripeObj.id
    })
  } else {
    console.log('UPDATING STRIPE CUSTOMER');
    return stripe.customers.update(user.stripeCustomer.id, {
      source: stripeObj.id
    })
  }
}

module.exports = (req, res) =>
  validate(req)
    .then(validatedUser => findOrCreateStripeCustomer(validatedUser, req.body.stripe))
      .then(customer => {
        console.log('USER CUSTOMER READY');
        const new_stripe_card = req.body.stripe.card
        const old_stripeCards = req.user.stripeCards || []
        const updated_stripe = { stripeCards: old_stripeCards.concat(new_stripe_card), stripeCustomer: customer }
        return Promise.all( [ customer, User.update(updated_stripe, { where: { id: req.user.id }, returning: true, plain: true }) ])
      })
      .then(([customer, user]) => {
        console.log('UPDATED USER');
        res.status(200).json({ card: req.body.stripe.card, customer })
      })
    .catch(error => {
      console.log('USER CUSTOMER ERROR', error);
      res.status(400).json({error})
    })
