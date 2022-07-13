'use strict'

const { createToken } = require('../utils/token')

class AuthService {

	constructor() {
		this.users = [
			{
				id: 1,
				name: "MiauMiau",
				lastName: "The Cat",
				password: "MegaStrongPassword",
				userName: "the_badass_cat@whiskers.com"
			}
		]
	}

	getUserById(id) {
		return this.users.find(user => user.id === id)
	}

	login ({ userName, password }) {

		const user = this.users.find(user => user.userName === userName && user.password === password)
		
		if(!user) throw new Error('Not found')

		const token = createToken({id: user.id, name: user.name, lastName: user.lastName})
		// console.log('token: ', token)
		
		return token
	}

}

module.exports = new AuthService() 