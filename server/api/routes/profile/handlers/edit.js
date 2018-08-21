const { User } = requireDb

const { allPass, path, pick, pipe, merge, isNil } = require('ramda')

const profileAttributes = ['id', 'name', 'username', 'image', 'bio', 'website']

const validate = req =>
  User.findOne({
      where: { username: req.body.profile.username },
      plain: true
  })
  .then(user =>
      user && user.id !== req.user.id ?
          Promise.reject('invalid user')
          : req.body.profile
  )

const validateUsername = (req, username, id) =>
  User.findOne({
      where: { username, id: { $ne: id } }
  })
  .then(user =>
      user ?
          Promise.reject('username taken')
          : username
  )

const makeValidWebsite = website => {
  if(!website) {
    return ''
  }
  return /^((http|https|ftp):\/\/)/.test(website) ? website : `http://${website}`
}

module.exports = (req, res) =>
  validate(req)
    .then(({ username, id }) => validateUsername(req, username, id))
    .then(validatedUsername => {
      const validWebsite = makeValidWebsite(req.body.profile.website)
      const updatedUser = merge({
        username: validatedUsername || req.body.profile.username,
        website: validWebsite,
      }, pick(['name', 'dob', 'bio'], req.body.profile))
      return User.update(updatedUser, { where: { id: req.user.id }, returning: true, plain: true })
    })
    .then(user => {
      const profile = pick(profileAttributes, user[1])
      res.status(200).json({profile})
    })
    .catch(error => res.status(400).json({error}))
