const router = require('express').Router()

const auth = require('./auth')
const stripe = require('./stripe')
const profile = require('./profile')
const upload = require('./upload')
const orders = require('./orders')
const admin = require('./admin')

module.exports = io =>
  router
    .use('/auth', auth)
    .use('/stripe', stripe)
    .use('/user', profile)
    .use('/orders', orders(io))
    .use('/upload', upload)
    .use('/admin', admin)
