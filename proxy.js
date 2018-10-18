const http = require('http')
const httpProxy = require('http-proxy')
const HttpProxyRules = require('http-proxy-rules')

const proxyRules = new HttpProxyRules({
  rules: {
    '.*/api': 'http://localhost:3000/api'
  },
  default: 'http://localhost:1234' // frontend
})

const proxy = httpProxy.createProxy()

http.createServer((req, res) => {
  const target = proxyRules.match(req)
  if (target) {
    return proxy.web(req, res, {
      target: target
    })
  }

  res.writeHead(500, {
    'Content-Type': 'text/plain'
  })
  res.end('The request url and path did not match any of the listed rules!')
}).listen(8080, () => console.info(`Proxy running on http://localhost:8080`))
