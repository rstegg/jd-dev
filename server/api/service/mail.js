const api_key = process.env.MAILGUN_SECRET
const domain = 'mg.kuwau.com'
const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain})
const mailcomposer = require('mailcomposer')

const confirmationTemplate = require('../emails/confirmation')
const resetTemplate = require('../emails/reset')

const confirmationMail = (user, permalink_url) => mailcomposer({
  from: 'JawDrop <hello@mg.jawdrop.io>',
  to: user.email,
  subject: 'Verify your email address to use jawdrop.io',
  text: `Hi there, this message is to confirm that the Kuwau account with the email ${user.email} belongs to you. To confirm that this is your jawdrop account, click here: ${permalink_url}`,
  html: confirmationTemplate(user, permalink_url)
})

const sendConfirmation = (mail, user) => {
  mail.build((mailBuildError, message) => {
    const verifyEmail = {
      to: user.email,
      message: message.toString('ascii')
    }
    mailgun.messages().sendMime(verifyEmail, (sendError, body) => {
      console.log(body);
      if (sendError) {
        console.log(sendError);
        return;
      }
    })
  })
}

const resetPasswordMail = (user, permalink_url) => mailcomposer({
  from: 'JawDrop <hello@mg.jawdrop.io>',
  to: user.email,
  subject: 'Request to reset your password on jawdrop.io',
  text: `Forgot your password? Not to worry, we got you! Let’s get you a new password. Click here to reset your password: ${permalink_url}`,
  html: resetTemplate(user, permalink_url)
})

const sendPasswordReset = (mail, user) => {
  mail.build((mailBuildError, message) => {
    const verifyEmail = {
      to: user.email,
      message: message.toString('ascii')
    }
    mailgun.messages().sendMime(verifyEmail, (sendError, body) => {
      console.log(body);
      if (sendError) {
        console.log(sendError);
        return;
      }
    })
  })
}

module.exports = { mailgun, confirmationMail, sendConfirmation, resetPasswordMail, sendPasswordReset }
