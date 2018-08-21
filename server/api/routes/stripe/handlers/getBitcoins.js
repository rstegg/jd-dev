const { User } = requireDb
const { merge, pick } = require('ramda')

const userAttributes = ['id', 'stripeBitcoins']

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
    .then(({stripeBitcoins}) => res.status(200).json({stripeBitcoins}))
    .catch(error => res.status(400).json({error}))
