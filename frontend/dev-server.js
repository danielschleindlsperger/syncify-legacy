const proxy = require('http-proxy-middleware')
const Bundler = require('parcel-bundler')
const express = require('express')

let bundler = new Bundler('index.html')
let app = express()

app.use(
  '/api',
  proxy({
    target: 'http://localhost:3000'
  })
)

app.use(bundler.middleware())

const PORT = Number(process.env.PORT || 1234)

app.listen(PORT, () => {
  console.log(`Started dev-server on http://localhost:${PORT}`)
})