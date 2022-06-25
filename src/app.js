'use strict'

const express = require('express')
const bodyParser = require('body-parser')

// routes
const initUserRoutes = require('./routes/user')

function initApp () {
  const app = express()

  app.use(bodyParser.json())

  initUserRoutes(app)

  return app
}

module.exports = initApp
