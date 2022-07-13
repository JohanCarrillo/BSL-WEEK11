/* declare all response functions that routes will use
  errors must be handled because services functions throw errors
  and we need to send a response to the client saying what went wrong.
  Here we also manage theparameter we pass to the services functions,
  this is made by properly handling the req.body req.query req.params etc
*/
'use strict'

const Boom = require('@hapi/boom')

const userService = require('../services/user')

function get (req, res, next) {
  try {
    // console.log('get user: ', req.user)
    console.log('showing all users')
    return res.send(userService.getUsers(req.query))
  } catch (err) {
    console.log(err)
    return next(Boom.notFound(err.message))
  }
}

function getUserById (req, res, next) {
  try {
    console.log(req.params)
    return res.send(userService.getUserById(req.params.id))
  } catch (err) {
    console.log(err)
    const regex = new RegExp('existe', 'g')
    if (regex.test(err.message)) {
      return next(Boom.notFound(err.message))
    }
  }
}

function update (req, res, next) {
  try {
    console.log(req.params)
    return res.status(200).send(userService.update(req.params.id, req.body))
  } catch (err) {
    console.log(err)
    const regex = new RegExp('existe', 'g')
    if (regex.test(err.message)) {
      return next(Boom.notFound(err.message))
    }
  }
}

function remove (req, res, next) {
  try {
    console.log(req.params)
    return res.status(204).send(userService.remove(req.params.id))
  } catch (err) {
    console.log(err)
    const regex = new RegExp('existe', 'g')
    if (regex.test(err.message)) {
      return next(Boom.notFound(err.message))
    }
  }
}

function post (req, res, next) {
  try {
    const user = userService.createUser(req.body)

    return res.status(201).send(user)
  } catch (err) {
    // return next(err)
    console.log(err.message)
    const regex = new RegExp('requerido', 'g')  // we use regex to see what error we got
    // in this case we know the error has the word "requerido" so we try to catch it
    if (regex.test(err.message)) {
      return next(Boom.badRequest(err.message))
    }
  }
}

module.exports = {
  get,
  post,
  update,
  remove,
  getUserById
}