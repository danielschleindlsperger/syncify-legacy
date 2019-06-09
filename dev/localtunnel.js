const localtunnel = require('localtunnel')

const createTunnel = (port = 8080) => {
  const opts = { subdomain: 'syncify-dev-1234' }

  const tunnel = localtunnel(port, opts, (err, tunnel) => {
    if (err) {
      console.error(
        'Could not create localtunnel. Maybe somebody else is using the unique domain already?',
        err,
      )
    }

    // the assigned public url for your tunnel
    // i.e. https://abcdefgjhij.localtunnel.me
    tunnel.url
    console.info(`Created localtunnel to localhost:${port} at ${tunnel.url}`)
  })

  tunnel.on('close', function() {
    // tunnels are closed
  })
}
module.exports = {
  createTunnel,
}
