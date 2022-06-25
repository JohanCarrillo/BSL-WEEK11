'use strict'

let cont = 1
let users = []

function createUser (user) {
  if (!user.name) {
    throw new Error('El nombre del usuarion es requerido')
  }

  user.id = cont
  cont += 1

  users.push(user)

  return user
}

function getUsers (params) {
  if (params.name) {
    const data = users.filter(user => user.name === params.name)

    return data
  }

  return users
}

function getUserById (id) {
  const user = users.find(user => user.id === Number.parseInt(id, 10))

  if (!user) {
    throw new Error('El usuario no existe')
  }

  return user
}

function remove (id) {
  const user = users.find(user => user.id === Number.parseInt(id, 10))

  if (!user) {
    throw new Error('El usuario no existe')
  }

  users = users.filter(item => item.id !== Number.parseInt(id, 10))

  return user
}

function update (id, data) {
  const index = users.findIndex(user => user.id === Number.parseInt(id, 10))

  if (index < 0) {
    throw new Error('El usuario no existe')
  }

  let user = users[index]

  user = {
    ...user,
    ...data
  }

  users[index] = user

  return user
}

module.exports = {
  remove,
  update,
  getUsers,
  createUser,
  getUserById
}