const router = require('express').Router()
const passport = apiRequire('service/auth')

const addStripeCardHandler = require('./handlers/addCard')
const getStripeCardsHandler = require('./handlers/getCards')
const addStripeBankHandler = require('./handlers/addBank')
const getStripeBanksHandler = require('./handlers/getBanks')
const addStripeBitcoinHandler = require('./handlers/addBitcoin')
const getStripeBitcoinsHandler = require('./handlers/getBitcoins')

module.exports =
  router
    .use(passport.authenticate('jwt', { session: false }))
    .get(`/cards`,
      getStripeCardsHandler
    )
    .post('/cards',
      addStripeCardHandler
    )
    .get(`/banks`,
      getStripeBanksHandler
    )
    .post('/banks',
      addStripeBankHandler
    )
    .get(`/bitcoins`,
      getStripeBitcoinsHandler
    )
    .post('/bitcoins',
      addStripeBitcoinHandler
    )
