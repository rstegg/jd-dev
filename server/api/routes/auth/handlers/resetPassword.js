const { User } = requireDb
const { mailgun } = apiRequire('service/mail')

const { pathEq } = require('ramda')

module.exports = (req, res) =>
  User.findOne({ where: { resetPermalink: req.params.permalink }})
    .then(user =>
      !pathEq(['resetVerifyToken'], req.params.verifyToken, user) ?
        res.status(200).send('Invalid reset verification token. Please try again or contact support.')
        : User.update({ password: req.body.user.password, resetPermalink: '', resetVerifyToken: '' }, { where: { id: user.id }, returning: true, plain: true })
    )
    .then(([_, updatedUser]) => res.status(200).json({ user: updatedUser }))
    .catch(err => res.status(400)) //TODO: if this fails, we want to know
