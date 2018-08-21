const { Product } = requireDb

const { mailgun } = apiRequire('service/mail')

const shortId = require('shortid')
const mailcomposer = require('mailcomposer')
const shareEmailTemplate = apiRequire('emails/share')

const { allPass, merge, path, pick, pipe, isNil } = require('ramda')

const validField = p => obj => !isNil(path([p], obj))

const validate = req =>
  Product.findOne({
      where: { id: req.body.productId }
  })
  .then(product =>
      !product ?
          Promise.reject('invalid product') :
          product
  )

module.exports = (req, res) =>
  validate(req)
    .then(product =>
      mailcomposer({
        from: 'kuwau.com <hello@mg.kuwau.com>',
        to: req.body.email,
        subject: `Dear ${req.body.name}, someone shared a post with you at kuwau.com!`,
        text: `${req.user.name} shared a link on kuwau.com! ${req.body.url}`,
        html: shareEmailTemplate(req.body.name, req.user.name, req.body.url, req.body.message)
      })
      .build((mailBuildError, message) =>
        mailBuildError ? Promise.reject(mailBuildError)
        : mailgun.messages().sendMime({
            to: req.body.email,
            message: message.toString('ascii')
          }, (sendError, body) =>
            sendError ? Promise.reject(sendError)
            : body
        )
      )
    )
    .then(msg => res.status(200).json({sent: true}))
    .then(error => res.status(400).json({error}))
