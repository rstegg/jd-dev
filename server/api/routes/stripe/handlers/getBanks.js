const { User } = requireDb
const { merge, pick } = require('ramda')

const userAttributes = ['id', 'stripeBanks']

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
    .then(({stripeBanks}) => res.status(200).json({stripeBanks}))
    .catch(error => res.status(400).json({error}))
