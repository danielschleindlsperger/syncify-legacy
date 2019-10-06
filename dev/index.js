const http = require('http')
const url = require('url')
const httpProxy = require('http-proxy')
const HttpProxyRules = require('http-proxy-rules')

// https://stackoverflow.com/a/41407246
const Reset = '\x1b[0m'
const Bright = '\x1b[1m'
const BgMagenta = '\x1b[45m'
const FgYellow = '\x1b[33m'

const WEBAPP = 'http://localhost:1234'
const GRAPHQL_API = 'http://localhost:4000/graphql'
const { PORT = 8080 } = process.env

const proxyRules = new HttpProxyRules({
  rules: {
    '.*/graphql': GRAPHQL_API,
  },
  default: WEBAPP,
})

const proxy = httpProxy.createProxy()

const handleProxyError = err => {
  console.error('Could not proxy request\n', err)
}

http
  .createServer((req, res) => {
    const { pathname, query } = url.parse(req.url)
    console.info(`${req.method} - ${pathname}${query ? '?' + query : ''}`)
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

    res.writeHead(500, {
      'Content-Type': 'text/plain',
    })
    res.end('The request url and path did not match any of the listed rules!')
  })
  .listen(PORT, () =>
    console.info(
      `Proxy running on ${Bright}${BgMagenta}${FgYellow}http://localhost:${PORT}${Reset}`,
    ),
  )
