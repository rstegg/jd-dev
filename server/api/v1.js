'use strict'
const router = require('express').Router()
const jwt = require('jsonwebtoken')

const routes = require('./routes')

module.exports =
  router.use('/', routes)
