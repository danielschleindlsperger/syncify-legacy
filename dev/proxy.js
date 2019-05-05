const http = require('http')
const httpProxy = require('http-proxy')
const HttpProxyRules = require('http-proxy-rules')

const proxyRules = new HttpProxyRules({
  rules: {
    '.*/api': 'http://localhost:3000/api',
    '.*/real-time': 'http://localhost:3001/real-time',
  },
  default: 'http://localhost:1234', // frontend
})

const proxy = httpProxy.createProxy()

const handleProxyError = err => {
  console.error('Could not proxy request \n', err)
}

const createProxy = (port = 8080) => {
  http
    .createServer((req, res) => {
      const target = proxyRules.match(req)
      if (target) {
        return proxy.web(
          req,
          res,
          {
            target,
          },
          handleProxyError,
        )
      }

      console.log(res)

      res.writeHead(500, {
        'Content-Type': 'text/plain',
      })
      res.end('The request url and path did not match any of the listed rules!')
    })
    .listen(port, () => console.info(`Proxy running on http://localhost:${port}`))
}

module.exports = {
  createProxy,
}
