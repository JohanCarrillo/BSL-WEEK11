'use strict'

const Boom = require('@hapi/boom')

module.exports = function error(error, req, res, next) {
	if (error.Boom) return res.status(error.output.statusCode).send(error.output.payload)

	const newError = Boom.internal('Wrong error')
	return res.status(newError.output.statusCode).send(newError.output.payload)

}