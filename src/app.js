'use strict'

const express = require('express')
const bodyParser = require('body-parser')

// routes
const initUserRoutes = require('./routes/user')
const initAuthRoutes = require('./routes/auth')
const validateToken = require('./middlewares/validateToken')

function initApp () {
  const app = express()

  app.use(bodyParser.json())
  app.use(validateToken)

  initUserRoutes(app)
  initAuthRoutes(app)

  return app
}

module.exports = initApp
