const { User } = requireDb
const stripe = apiRequire('service/stripe')

const { allPass, path, pick, pipe, merge, isNil } = require('ramda')

const validField = p => obj => !isNil(path([p], obj))

// const validBitcoinAddress = pipe(
//     path(['body', 'bitcoin']),
//     allPass([
//         validField('address')
//     ]))

const validate = req => {
  // if (!validBitcoinAddress(req)) return Promise.reject('invalid bitcoin address')

  return User.findOne({
      where: { id: req.user.id },
      plain: true
  })
  .then(user =>
      !user ? Promise.reject('invalid user')
      : user
  )
}

module.exports = (req, res) =>
  validate(req)
    .then(validatedUser => {
      return User.update({bitcoin_address: req.body.bitcoin_address}, { where: { id: req.user.id }, returning: true, plain: true })
    })
      .then(user => {
        const stripe_bitcoin = req.body.stripeResponse.bitcoin
        res.status(200).json({stripe_bitcoin})
      })
    .catch((error, e) => res.status(400).json({error, e}))
