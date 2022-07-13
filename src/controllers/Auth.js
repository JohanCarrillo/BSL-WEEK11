'use strict'

const authService = require('../services/Auth')

class Auth {
	constructor() {}

	static login (req, res) {
		// console.log(process.env.TOKEN_SIGNATURE)

		try {
			const token = authService.login(req.body)
			
			return res.send(token)

		} catch (err) {
			
			const regex = new RegExp('invalid signature', 'g')
			const regexUser = new RegExp('Not found', 'g')

			if (regex.test(err.message)) {
				return res.status(401).send('Unauthorized')
			}
			if (regexUser.test(err.message)) {
				return res.status(404).send('User not found')
			}
		}

		// return res.send({message: 'received post'})
	}
}

module.exports = Auth