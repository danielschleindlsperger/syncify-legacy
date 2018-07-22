// bootstrapping...

// read .env file and add to process.env global variable
require('dotenv').config()

// transpile code with babel
if (process.env.NODE_ENV !== 'production') {
  require('babel-register') // eslint-disable-line
}

const { connectDb } = require('./services/database')

// start app after db connection has been initialized
connectDb().then(() => {
  const { app } = require('./app')
  const { APP_HOST , APP_PORT } = process.env
  
  // start app
  app.listen(APP_PORT, () => {
    // eslint-disable-next-line
    console.log(`Started ${process.env.NODE_ENV} API server on ${APP_HOST}:${APP_PORT}`)
  })
})
