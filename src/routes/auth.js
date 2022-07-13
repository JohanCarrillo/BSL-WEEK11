'use strict'

const Auth = require('../controllers/Auth')

function initAuthRoutes(app) {
	app.post('/auth/login', Auth.login);
}

module.exports = initAuthRoutes