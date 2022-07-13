'use strict'

const {verifyToken} = require('../utils/token')
const authService = require('../services/Auth')

function validateToken(req, res, next) {
	const { authorization } = req.headers

	// exclude login request
	if (req.url === '/auth/login') return next()

	if (!authorization) return res.status(401).send('Unauthorized')

	// standard case
	if (!authorization.startsWith('Bearer')) {
		return res.status(401).send('Unauthorized')
	}

	const {1: token} = authorization.split(' ')

	if (!token) return res.status(401).send('Unauthorized')

	try {
		const data = verifyToken(token)
		const user = authService.getUserById(data.id)

		if (!user) return res.status(401).send('Unauthorized')

		req.user = user

		next()

	} catch (err) {
		console.log(err)
		return res.status(401).send('Unauthorized')
	}

}

module.exports = validateToken