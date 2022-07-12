/* declare all routes and call response functions */

'use strict'

const userController = require('../controllers/user')

function initUserRoutes (app) {
  app.get('/users', userController.get)
  
  app.post('/users', userController.post)

  app.get('/users/:id', userController.getUserById)

  app.patch('/users/:id', userController.update)

  app.delete('/users/:id', userController.remove)
}

module.exports = initUserRoutes
