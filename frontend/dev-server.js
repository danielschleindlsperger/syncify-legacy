const proxy = require('http-proxy-middleware')
const Bundler = require('parcel-bundler')
const express = require('express')

let bundler = new Bundler('index.html')
let app = express()

app.use(
  '/api',
  proxy({
    target: 'http://localhost:3000' // TODO: Read backend URL from env file
  })
)

app.use(bundler.middleware())

app.listen(1234, () => {
  console.log('\n\nRunning dev-server on http://localhost:1234\n')
})