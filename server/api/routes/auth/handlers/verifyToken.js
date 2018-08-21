const { User } = requireDb
const { mailgun } = apiRequire('service/mail')

const { pathEq } = require('ramda')

module.exports = (req, res) =>
  User.findOne({ where: { permalink: req.params.permalink }})
    .then(user =>
      !pathEq(['verifyToken'], req.params.verifyToken, user) ?
        res.status(200).send('Invalid verification token. Please try again or contact support.')
        : User.update({ verified: true }, { where: { permalink: req.params.permalink }, returning: true, plain: true })
    )
    .then(updatedUser =>
      mailgun
        .lists('news@mg.kuwau.com')
        .members()
        .create({
          subscribed: true,
          name: user.name,
          address: user.email
        }, (err, data) => {
          if (err) {
            console.error(err);
          }
          res.redirect('/')
        })
    )
    .catch(err => res.redirect('/')) //TODO: if this fails, we want to know
