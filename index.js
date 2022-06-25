'use strict'

const initApp = require('./src/app')

const server = initApp()

server.listen(3000, () => console.log('Server running on port 3000'))