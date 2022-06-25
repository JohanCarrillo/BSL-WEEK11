'use strict'

const userService = require('../services/user')

function get (req, res) {
  try {
    return res.send(userService.getUsers(req.query))
  } catch (err) {
    console.log(err)
    return res.status(500).send('Internal server error')
  }
}

function getUserById (req, res) {
  try {
    console.log(req.params)
    return res.send(userService.getUserById(req.params.id))
  } catch (err) {
    console.log(err)
    const regex = new RegExp('existe', 'g')
    if (regex.test(err.message)) {
      return res.status(404).send('Not found')
    }
  }
}

function update (req, res) {
  try {
    console.log(req.params)
    return res.status(200).send(userService.update(req.params.id, req.body))
  } catch (err) {
    console.log(err)
    const regex = new RegExp('existe', 'g')
    if (regex.test(err.message)) {
      return res.status(404).send('Not found')
    }
  }
}

function remove (req, res) {
  try {
    console.log(req.params)
    return res.status(204).send(userService.remove(req.params.id))
  } catch (err) {
    console.log(err)
    const regex = new RegExp('existe', 'g')
    if (regex.test(err.message)) {
      return res.status(404).send('Not found')
    }
  }
}

function post (req, res) {
  try {
    const user = userService.createUser(req.body)

    return res.status(201).send(user)
  } catch (err) {
    console.log(err.message)
    const regex = new RegExp('requerido', 'g')
    if (regex.test(err.message)) {
      return res.status(400).send('Bad request')
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