'use strict'

const { sign, verify } = require('jsonwebtoken');

function createToken(data) {
	return sign(data, process.env.TOKEN_SIGNATURE, {expiresIn: '5h'});
}

function verifyToken (token) {
	return verify(token, process.env.TOKEN_SIGNATURE);
}

module.exports = {
	createToken,
	verifyToken
}