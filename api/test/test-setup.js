// read .env file and add to process.env global variable
require('dotenv').config()

// exectutes a koa middleware on the given context
const runMiddleware = (middleware, ctx) => {
  middleware(ctx, () => {})
}

global.runMiddleware = runMiddleware
