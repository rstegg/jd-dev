const api_key = process.env.MAILGUN_SECRET
const domain = 'mg.kuwau.com'
const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain})
const mailcomposer = require('mailcomposer')

const confirmationTemplate = require('../emails/confirmation')

const confirmationMail = (user, permalink_url) => mailcomposer({
  from: 'kuwau.com <hello@mg.kuwau.com>',
  to: user.email,
  subject: 'Verify your email address to use kuwau.com',
  text: `Hi there, this message is to confirm that the Kuwau account with the username ${user.username} belongs to you. To confirm that this is your kuwau account, click here: ${permalink_url}`,
  html: confirmationTemplate(user, permalink_url)
})

const sendConfirmation = (mail, user) => {
  mail.build((mailBuildError, message) => {
    const verifyEmail = {
      to: user.email,
      message: message.toString('ascii')
    }
    mailgun.messages().sendMime(verifyEmail, (sendError, body) => {
      if (sendError) {
        console.log(sendError);
        return;
      }
    })
  })
}

module.exports = { mailgun, confirmationMail, sendConfirmation }
