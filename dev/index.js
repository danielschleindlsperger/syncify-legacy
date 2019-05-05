const { createProxy } = require('./proxy')
const { createTunnel } = require('./localtunnel')

const { PORT = 8080 } = process.env

createProxy(PORT)
// createTunnel(PORT)
