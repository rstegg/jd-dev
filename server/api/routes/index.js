const router = require('express').Router()

const auth = require('./auth')
const stripe = require('./stripe')
const profile = require('./profile')
const images = require('./images')
const orders = require('./orders')

module.exports =
  router
    .use('/auth', auth)
    .use('/stripe', stripe)
    .use('/user', profile)
    .use('/orders', orders)
    .use('/image', images)
