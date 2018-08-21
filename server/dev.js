require('dotenv').load()
require('./require')

const path = require('path')
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const http = require('http').Server(app)
const passport = require('passport')
const startSockets = require('./sockets')
const io = require('socket.io')(http, { path: '/WSS' })

const API_HOST = process.env.API_HOST || '/api/v1'

app
  .use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(passport.initialize())

startSockets(io)

const port = process.env.PORT || 3030
http.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

const apiRoutes = require('./api/v1')

app.use(API_HOST, apiRoutes)
